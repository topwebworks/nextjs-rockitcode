import '@testing-library/jest-dom'

// Mock react-syntax-highlighter to avoid ES module issues
jest.mock('react-syntax-highlighter', () => ({
  Prism: ({ children, ...props }) => <pre {...props}>{children}</pre>,
  default: ({ children, ...props }) => <pre {...props}>{children}</pre>,
}))

jest.mock('react-syntax-highlighter/dist/esm/styles/prism', () => ({
  dracula: {},
  tomorrow: {},
  prism: {},
}))

// Mock framer-motion to avoid issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    span: ({ children, ...props }) => <span {...props}>{children}</span>,
    h1: ({ children, ...props }) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    svg: ({ children, ...props }) => <svg {...props}>{children}</svg>,
    path: ({ children, ...props }) => <path {...props}>{children}</path>,
    circle: ({ children, ...props }) => <circle {...props}>{children}</circle>,
  },
  AnimatePresence: ({ children }) => children,
  useInView: () => true,
  useAnimation: () => ({
    start: jest.fn(),
    stop: jest.fn(),
    set: jest.fn(),
  }),
}))

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
  signIn: jest.fn(),
  signOut: jest.fn(),
}))

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock intersection observer
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock
