'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/button'
import { clsx } from 'clsx'
import { 
  ContentItem, 
  ContentManager, 
  contentManager,
  LessonContent,
  ExerciseContent,
  ContentValidation 
} from '@/lib/content-management'

interface ContentManagerUIProps {
  className?: string
}

/**
 * Content Management Dashboard
 * 
 * A comprehensive interface for creating, editing, and managing educational content.
 * Features content validation, real-time preview, and bulk operations.
 */
export function ContentManagerUI({ className }: ContentManagerUIProps) {
  const [content, setContent] = useState<ContentItem[]>([])
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [filter, setFilter] = useState<{
    type?: ContentItem['type']
    status?: ContentItem['status']
    language?: string
  }>({})
  const [validationResults, setValidationResults] = useState<Map<string, ContentValidation>>(new Map())

  useEffect(() => {
    loadContent()
  }, [filter])

  const loadContent = async () => {
    try {
      const items = await contentManager.listContent(filter)
      setContent(items)
    } catch (error) {
      console.error('Failed to load content:', error)
    }
  }

  const validateAllContent = async () => {
    const results = new Map<string, ContentValidation>()
    
    for (const item of content) {
      const validation = await contentManager.validateContent(item)
      results.set(item.id, validation)
    }
    
    setValidationResults(results)
  }

  const handleContentSave = async (updatedContent: ContentItem) => {
    try {
      if (selectedContent) {
        await contentManager.updateContent(selectedContent.id, updatedContent)
      } else {
        await contentManager.createContent(updatedContent)
      }
      
      await loadContent()
      setIsEditing(false)
      setSelectedContent(null)
    } catch (error) {
      console.error('Failed to save content:', error)
    }
  }

  const handleContentDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content?')) return
    
    try {
      await contentManager.deleteContent(id, 'admin')
      await loadContent()
      if (selectedContent?.id === id) {
        setSelectedContent(null)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Failed to delete content:', error)
    }
  }

  const getValidationStatus = (item: ContentItem) => {
    const validation = validationResults.get(item.id)
    if (!validation) return null
    
    if (!validation.isValid) return 'error'
    if (validation.warnings.length > 0) return 'warning'
    return 'valid'
  }

  return (
    <div className={clsx('flex h-screen bg-gray-50 dark:bg-gray-900', className)}>
      {/* Sidebar - Content List */}
      <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Content Manager
            </h2>
            <Button
              onClick={() => {
                setSelectedContent(null)
                setIsEditing(true)
              }}
              className="text-sm px-3 py-1"
            >
              New Content
            </Button>
          </div>

          {/* Filters */}
          <div className="space-y-2">
            <select
              value={filter.type || ''}
              onChange={(e) => setFilter(prev => ({ ...prev, type: e.target.value as ContentItem['type'] || undefined }))}
              className="w-full p-2 text-sm border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Types</option>
              <option value="lesson">Lessons</option>
              <option value="exercise">Exercises</option>
              <option value="quiz">Quizzes</option>
              <option value="video">Videos</option>
              <option value="reading">Reading</option>
            </select>

            <select
              value={filter.status || ''}
              onChange={(e) => setFilter(prev => ({ ...prev, status: e.target.value as ContentItem['status'] || undefined }))}
              className="w-full p-2 text-sm border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">All Status</option>
              <option value="draft">Draft</option>
              <option value="review">Review</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>

            <Button
              onClick={validateAllContent}
              className="w-full text-sm"
            >
              Validate All
            </Button>
          </div>
        </div>

        {/* Content List */}
        <div className="overflow-y-auto h-full">
          {content.map((item) => {
            const validationStatus = getValidationStatus(item)
            
            return (
              <div
                key={item.id}
                onClick={() => setSelectedContent(item)}
                className={clsx(
                  'p-3 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700',
                  selectedContent?.id === item.id && 'bg-blue-50 dark:bg-blue-900/20'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={clsx(
                        'inline-block w-2 h-2 rounded-full',
                        item.status === 'published' && 'bg-green-500',
                        item.status === 'draft' && 'bg-yellow-500',
                        item.status === 'review' && 'bg-blue-500',
                        item.status === 'archived' && 'bg-gray-500'
                      )} />
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {item.type} • {item.metadata.estimatedMinutes}m
                    </p>
                  </div>
                  
                  {validationStatus && (
                    <span className={clsx(
                      'inline-block w-3 h-3 rounded-full',
                      validationStatus === 'valid' && 'bg-green-500',
                      validationStatus === 'warning' && 'bg-yellow-500',
                      validationStatus === 'error' && 'bg-red-500'
                    )} />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {isEditing ? (
          <ContentEditor
            content={selectedContent}
            onSave={handleContentSave}
            onCancel={() => {
              setIsEditing(false)
              setSelectedContent(null)
            }}
          />
        ) : selectedContent ? (
          <ContentPreview
            content={selectedContent}
            validation={validationResults.get(selectedContent.id)}
            onEdit={() => setIsEditing(true)}
            onDelete={() => handleContentDelete(selectedContent.id)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white dark:bg-gray-800">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Content Selected
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Choose content from the sidebar to view or edit
              </p>
              <Button onClick={() => setIsEditing(true)}>
                Create New Content
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface ContentEditorProps {
  content: ContentItem | null
  onSave: (content: ContentItem) => void
  onCancel: () => void
}

function ContentEditor({ content, onSave, onCancel }: ContentEditorProps) {
  const [formData, setFormData] = useState<Partial<ContentItem>>({
    type: 'lesson',
    title: '',
    description: '',
    status: 'draft',
    metadata: {
      estimatedMinutes: 15,
      difficulty: 'beginner',
      tags: [],
      prerequisites: [],
      learningObjectives: [],
      isRequired: true,
      sortOrder: 0
    },
    content: {}
  })

  useEffect(() => {
    if (content) {
      setFormData(content)
    }
  }, [content])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.title && formData.type) {
      onSave(formData as ContentItem)
    }
  }

  return (
    <div className="flex-1 bg-white dark:bg-gray-800 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {content ? 'Edit Content' : 'Create New Content'}
          </h2>
          <div className="flex gap-2">
            <Button onClick={onCancel} className="bg-gray-500 hover:bg-gray-600">
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Save
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as ContentItem['type'] }))}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="lesson">Lesson</option>
                <option value="exercise">Exercise</option>
                <option value="quiz">Quiz</option>
                <option value="video">Video</option>
                <option value="reading">Reading</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as ContentItem['status'] }))}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="draft">Draft</option>
                <option value="review">Review</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Estimated Minutes
              </label>
              <input
                type="number"
                value={formData.metadata?.estimatedMinutes}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  metadata: { ...prev.metadata!, estimatedMinutes: parseInt(e.target.value) }
                }))}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={formData.metadata?.difficulty}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  metadata: { ...prev.metadata!, difficulty: e.target.value as any }
                }))}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort Order
              </label>
              <input
                type="number"
                value={formData.metadata?.sortOrder}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  metadata: { ...prev.metadata!, sortOrder: parseInt(e.target.value) }
                }))}
                className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                min="0"
              />
            </div>
          </div>

          {/* Content-specific fields would go here based on type */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Content Configuration
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Content-specific fields for {formData.type} would be displayed here.
              This includes lesson sections, exercise code, quiz questions, etc.
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

interface ContentPreviewProps {
  content: ContentItem
  validation?: ContentValidation
  onEdit: () => void
  onDelete: () => void
}

function ContentPreview({ content, validation, onEdit, onDelete }: ContentPreviewProps) {
  return (
    <div className="flex-1 bg-white dark:bg-gray-800 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {content.title}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {content.type} • {content.metadata.estimatedMinutes}m • {content.metadata.difficulty}
              </span>
              <span className={clsx(
                'px-2 py-1 text-xs rounded-full',
                content.status === 'published' && 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                content.status === 'draft' && 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                content.status === 'review' && 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                content.status === 'archived' && 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
              )}>
                {content.status}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={onEdit}>
              Edit
            </Button>
            <Button onClick={onDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </Button>
          </div>
        </div>

        {/* Validation Results */}
        {validation && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Validation Results
            </h3>
            <div className={clsx(
              'p-4 rounded-md',
              validation.isValid ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'
            )}>
              <div className="flex items-center gap-2 mb-2">
                <span className={clsx(
                  'w-3 h-3 rounded-full',
                  validation.isValid ? 'bg-green-500' : 'bg-red-500'
                )} />
                <span className={clsx(
                  'font-medium',
                  validation.isValid ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
                )}>
                  {validation.isValid ? 'Valid' : 'Invalid'}
                </span>
              </div>
              
              {validation.errors.length > 0 && (
                <div className="space-y-1">
                  {validation.errors.map((error, index) => (
                    <p key={index} className="text-sm text-red-700 dark:text-red-300">
                      • {error.message}
                    </p>
                  ))}
                </div>
              )}
              
              {validation.warnings.length > 0 && (
                <div className="space-y-1 mt-2">
                  {validation.warnings.map((warning, index) => (
                    <p key={index} className="text-sm text-yellow-700 dark:text-yellow-300">
                      ⚠ {warning.message}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Content Details */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Description
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {content.description || 'No description provided'}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Metadata
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-500 dark:text-gray-400">Duration:</span>
                <p className="text-gray-900 dark:text-white">{content.metadata.estimatedMinutes} minutes</p>
              </div>
              <div>
                <span className="font-medium text-gray-500 dark:text-gray-400">Difficulty:</span>
                <p className="text-gray-900 dark:text-white capitalize">{content.metadata.difficulty}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500 dark:text-gray-400">Required:</span>
                <p className="text-gray-900 dark:text-white">{content.metadata.isRequired ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <span className="font-medium text-gray-500 dark:text-gray-400">Order:</span>
                <p className="text-gray-900 dark:text-white">{content.metadata.sortOrder}</p>
              </div>
            </div>
          </div>

          {content.metadata.tags.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {content.metadata.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full dark:bg-blue-900 dark:text-blue-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Content Preview
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Content preview for {content.type} would be rendered here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
