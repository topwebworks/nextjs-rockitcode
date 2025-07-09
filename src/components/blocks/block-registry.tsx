'use client';

import React from 'react';
import type { BaseBlock, BlockProps, BlockRegistry } from '@/types/blocks';

class BlockRegistryImpl implements BlockRegistry {
  private blocks = new Map<string, React.ComponentType<BlockProps<any>>>();

  register<T extends BaseBlock>(
    type: string, 
    component: React.ComponentType<BlockProps<T>>
  ): void {
    this.blocks.set(type, component);
  }

  unregister(type: string): void {
    this.blocks.delete(type);
  }

  get<T extends BaseBlock>(type: string): React.ComponentType<BlockProps<T>> | null {
    return this.blocks.get(type) || null;
  }

  getAll(): Record<string, React.ComponentType<BlockProps<any>>> {
    return Object.fromEntries(this.blocks);
  }
}

// Global registry instance
export const blockRegistry = new BlockRegistryImpl();

// Block Renderer Component
interface BlockRendererProps {
  blocks: BaseBlock[];
  isEditing?: boolean;
  onBlockUpdate?: (block: BaseBlock) => void;
  onBlockDelete?: (id: string) => void;
}

export function BlockRenderer({ 
  blocks, 
  isEditing = false, 
  onBlockUpdate, 
  onBlockDelete 
}: BlockRendererProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block) => {
        const BlockComponent = blockRegistry.get(block.type);
        
        if (!BlockComponent) {
          console.warn(`No component registered for block type: ${block.type}`);
          return (
            <div key={block.id} className="p-4 border border-red-200 bg-red-50 rounded-md">
              <p className="text-red-800">Unknown block type: {block.type}</p>
            </div>
          );
        }

        return (
          <div key={block.id} className="block-container">
            <BlockComponent 
              block={block}
              isEditing={isEditing}
              onUpdate={onBlockUpdate}
              onDelete={onBlockDelete}
            />
          </div>
        );
      })}
    </div>
  );
}

// HOC for creating block components with common functionality
export function createBlockComponent<T extends BaseBlock>(
  Component: React.ComponentType<{ block: T; isEditing?: boolean }>
) {
  return function BlockWrapper(props: BlockProps<T>) {
    const { block, isEditing, onUpdate, onDelete } = props;
    
    return (
      <div 
        className="relative group"
        data-block-id={block.id}
        data-block-type={block.type}
      >
        {isEditing && (
          <div className="absolute top-0 right-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex space-x-1 p-2">
              <button
                onClick={() => onUpdate?.(block)}
                className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete?.(block.id)}
                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        )}
        <Component block={block} isEditing={isEditing} />
      </div>
    );
  };
}
