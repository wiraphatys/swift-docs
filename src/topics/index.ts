import type { Topic, TopicGroup } from '@/lib/topics'

// Class 1 — Swift Basics
import variablesConstants from './swift/variables-constants'
import basicTypes from './swift/basic-types'
import controlFlow from './swift/control-flow'
import collections from './swift/collections'
import functionalMethods from './swift/functional-methods'
import structs from './swift/structs'

// Class 1 — Intro to SwiftUI
import viewsOverview from './swiftui/views-overview'

// Class 2 — Basic Layouts
import text from './swiftui/text'
import image from './swiftui/image'
import label from './swiftui/label'
import shapes from './swiftui/shapes'
import colors from './swiftui/colors'
import gradients from './swiftui/gradients'
import viewModifiers from './swiftui/view-modifiers'
import stacks from './swiftui/stacks'
import frames from './swiftui/frames'
import alignment from './swiftui/alignment'

// Class 3 — Interactions
import buttons from './swiftui/buttons'
import state from './swiftui/state'
import binding from './swiftui/binding'
import textFields from './swiftui/text-fields'
import toggle from './swiftui/toggle'
import slider from './swiftui/slider'
import stepper from './swiftui/stepper'
import pickers from './swiftui/pickers'
import animations from './swiftui/animations'

// Class 4 — Navigation & ScrollView
import sheet from './swiftui/sheet'
import navigationStack from './swiftui/navigation-stack'
import tabView from './swiftui/tabview'
import scrollView from './swiftui/scrollview'
import environment from './swiftui/environment'

// Class 5 — List View
import lists from './swiftui/lists'
import forEachView from './swiftui/foreach'

// Class 6 — Grid Layout
import gridLayout from './swiftui/grid-layout'
import lazyGrids from './swiftui/lazy-grids'

// Class 7 — Data Storage & API
import appStorage from './swiftui/app-storage'
import networking from './swiftui/networking'

const swiftTopics: Topic[] = [
  variablesConstants,
  basicTypes,
  controlFlow,
  collections,
  functionalMethods,
  structs,
]

const swiftuiTopics: Topic[] = [
  viewsOverview,
  text,
  image,
  label,
  shapes,
  colors,
  gradients,
  viewModifiers,
  stacks,
  frames,
  alignment,
  buttons,
  state,
  binding,
  textFields,
  toggle,
  slider,
  stepper,
  pickers,
  animations,
  sheet,
  navigationStack,
  tabView,
  scrollView,
  environment,
  lists,
  forEachView,
  gridLayout,
  lazyGrids,
  appStorage,
  networking,
]

export const ALL_TOPICS: Topic[] = [...swiftTopics, ...swiftuiTopics]

export const TOPIC_BY_SLUG: Record<string, Topic> = Object.fromEntries(
  ALL_TOPICS.map((t) => [t.slug, t]),
)

export const SWIFT_GROUPS: TopicGroup[] = [
  {
    category: 'swift',
    title: 'Class 1 — Swift Basics',
    slugs: [
      'variables-constants',
      'basic-types',
      'control-flow',
      'collections',
      'functional-methods',
      'structs',
    ],
  },
]

export const SWIFTUI_GROUPS: TopicGroup[] = [
  {
    category: 'swiftui',
    title: 'Class 1 — Intro to SwiftUI',
    slugs: ['views-overview'],
  },
  {
    category: 'swiftui',
    title: 'Class 2 — Basic Layouts',
    slugs: [
      'text',
      'image',
      'label',
      'shapes',
      'colors',
      'gradients',
      'view-modifiers',
      'stacks',
      'frames',
      'alignment',
    ],
  },
  {
    category: 'swiftui',
    title: 'Class 3 — Interactions',
    slugs: [
      'buttons',
      'state',
      'binding',
      'text-fields',
      'toggle',
      'slider',
      'stepper',
      'pickers',
      'animations',
    ],
  },
  {
    category: 'swiftui',
    title: 'Class 4 — Navigation & ScrollView',
    slugs: [
      'sheet',
      'navigation-stack',
      'tabview',
      'scrollview',
      'environment',
    ],
  },
  {
    category: 'swiftui',
    title: 'Class 5 — List View',
    slugs: ['lists', 'foreach'],
  },
  {
    category: 'swiftui',
    title: 'Class 6 — Grid Layout',
    slugs: ['grid-layout', 'lazy-grids'],
  },
  {
    category: 'swiftui',
    title: 'Class 7 — Data Storage & API',
    slugs: ['app-storage', 'networking'],
  },
]

export const ALL_GROUPS: TopicGroup[] = [...SWIFT_GROUPS, ...SWIFTUI_GROUPS]
