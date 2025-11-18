import type { Module } from '../types';

export const modules: Module[] = [
  {
    id: 'pm-fundamentals',
    title: 'PM Fundamentals',
    icon: '🎯',
    description: 'Learn the basics of product management and what PMs do',
    lessons: [
      {
        id: 'pm-fundamentals-1',
        moduleId: 'pm-fundamentals',
        title: 'What is Product Management?',
        type: 'concept',
        xpReward: 50,
        slides: [
          {
            id: 'slide-1',
            type: 'introduction',
            content: {
              title: 'Welcome to Product Management! 👋',
              text: "Product Managers (PMs) are often called the 'CEOs of the product' — though that's not quite accurate! Let's discover what PMs really do.",
              illustration: '💼',
            },
          },
          {
            id: 'slide-2',
            type: 'concept',
            content: {
              title: '💡 Key Concept',
              text: 'Product Managers sit at the intersection of:',
              keyPoints: [
                '🎨 Design (User Experience)',
                '⚙️ Engineering (Technical Feasibility)',
                '📈 Business (Company Goals)',
              ],
            },
          },
          {
            id: 'slide-3',
            type: 'quiz',
            content: {
              question: "Quick Check! 🤔 Which best describes a PM's role?",
              options: [
                { id: '1', text: 'They tell engineers what to build' },
                { id: '2', text: 'They design the product interface' },
                { id: '3', text: 'They bridge user needs, tech, and business goals' },
                { id: '4', text: 'They only focus on sales and marketing' },
              ],
              correctAnswer: '3',
              explanation: 'PMs act as connectors between different teams, balancing user needs, technical constraints, and business objectives to create successful products.',
            },
          },
          {
            id: 'slide-4',
            type: 'scenario',
            content: {
              title: 'Real-World Scenario 🌍',
              scenario: "You're a PM at Spotify. Users want offline downloads, but it will take 4 months to build, increase infrastructure costs, and competitors already have it. What do you consider first?",
              options: [
                { id: '1', text: 'Engineering timeline' },
                { id: '2', text: 'User impact and competitive threat' },
                { id: '3', text: 'Cost only' },
                { id: '4', text: 'What other PMs think' },
              ],
              correctAnswer: '2',
              explanation: 'Good PMs balance all factors, but user impact and competitive positioning often drive priority decisions. If competitors have it and users want it, it becomes strategically important.',
            },
          },
          {
            id: 'slide-5',
            type: 'completion',
            content: {
              title: '🎉 Lesson Complete!',
              text: 'You learned:',
              keyPoints: [
                '✓ PMs bridge design, engineering, and business',
                '✓ PMs prioritize based on user impact',
                '✓ PM ≠ Project Manager',
              ],
            },
          },
        ],
      },
      {
        id: 'pm-fundamentals-2',
        moduleId: 'pm-fundamentals',
        title: 'The Product Lifecycle',
        type: 'concept',
        xpReward: 50,
        slides: [
          {
            id: 'slide-1',
            type: 'introduction',
            content: {
              title: 'Understanding the Product Lifecycle 📊',
              text: 'Every product goes through distinct stages from conception to retirement. Understanding these stages helps PMs make better decisions.',
            },
          },
          {
            id: 'slide-2',
            type: 'concept',
            content: {
              title: 'The Four Stages',
              keyPoints: [
                '🚀 Introduction: Launch and early adoption',
                '📈 Growth: Rapid user acquisition and feature expansion',
                '📊 Maturity: Market saturation and optimization',
                '📉 Decline: Reduced demand and potential retirement',
              ],
            },
          },
          {
            id: 'slide-3',
            type: 'quiz',
            content: {
              question: 'What stage focuses on rapid user acquisition?',
              options: [
                { id: '1', text: 'Introduction' },
                { id: '2', text: 'Growth' },
                { id: '3', text: 'Maturity' },
                { id: '4', text: 'Decline' },
              ],
              correctAnswer: '2',
              explanation: 'The Growth stage is characterized by rapid user acquisition, expanding market share, and feature development to capture more users.',
            },
          },
          {
            id: 'slide-4',
            type: 'completion',
            content: {
              title: '🎉 Lesson Complete!',
            },
          },
        ],
      },
      {
        id: 'pm-fundamentals-3',
        moduleId: 'pm-fundamentals',
        title: 'PM vs PM Roles',
        type: 'concept',
        xpReward: 50,
        slides: [
          {
            id: 'slide-1',
            type: 'introduction',
            content: {
              title: 'Product Manager vs Project Manager',
              text: "These roles are often confused, but they're quite different!",
            },
          },
          {
            id: 'slide-2',
            type: 'concept',
            content: {
              title: 'Key Differences',
              keyPoints: [
                'Product Manager: WHAT and WHY (strategy, vision)',
                'Project Manager: HOW and WHEN (execution, timeline)',
                'Product Manager: Long-term product success',
                'Project Manager: Delivering on time and budget',
              ],
            },
          },
          {
            id: 'slide-3',
            type: 'quiz',
            content: {
              question: 'Who focuses on WHAT to build?',
              options: [
                { id: '1', text: 'Product Manager' },
                { id: '2', text: 'Project Manager' },
                { id: '3', text: 'Both' },
                { id: '4', text: 'Neither' },
              ],
              correctAnswer: '1',
              explanation: 'Product Managers focus on WHAT and WHY - defining what features to build and why they matter to users and business.',
            },
          },
          {
            id: 'slide-4',
            type: 'completion',
            content: {
              title: '🎉 Lesson Complete!',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'prioritization',
    title: 'Prioritization',
    icon: '⚖️',
    description: 'Master frameworks like RICE, MoSCoW, and stakeholder management',
    lessons: [
      {
        id: 'prioritization-1',
        moduleId: 'prioritization',
        title: 'Introduction to Prioritization',
        type: 'concept',
        xpReward: 50,
        slides: [
          {
            id: 'slide-1',
            type: 'introduction',
            content: {
              title: 'Why Prioritization Matters 🎯',
              text: "As a PM, you'll have countless feature requests and ideas. Learning to prioritize effectively is crucial for success.",
            },
          },
          {
            id: 'slide-2',
            type: 'concept',
            content: {
              title: 'The Prioritization Challenge',
              keyPoints: [
                '📊 Limited resources (time, engineers, budget)',
                '👥 Competing stakeholder interests',
                '⚖️ Balancing user needs vs business goals',
                '⏰ Time pressure and deadlines',
              ],
            },
          },
          {
            id: 'slide-3',
            type: 'quiz',
            content: {
              question: 'What is the main challenge in prioritization?',
              options: [
                { id: '1', text: 'Having too many ideas' },
                { id: '2', text: 'Limited resources and competing interests' },
                { id: '3', text: 'Not knowing what users want' },
                { id: '4', text: 'Technical constraints' },
              ],
              correctAnswer: '2',
              explanation: 'The core challenge is managing limited resources while balancing competing interests from stakeholders, users, and business goals.',
            },
          },
          {
            id: 'slide-4',
            type: 'completion',
            content: {
              title: '🎉 Lesson Complete!',
            },
          },
        ],
      },
      {
        id: 'prioritization-2',
        moduleId: 'prioritization',
        title: 'RICE Framework',
        type: 'interactive',
        xpReward: 75,
        slides: [
          {
            id: 'slide-1',
            type: 'introduction',
            content: {
              title: 'The RICE Framework 🍚',
              text: 'RICE is a quantitative framework for scoring features. It stands for Reach, Impact, Confidence, and Effort.',
            },
          },
          {
            id: 'slide-2',
            type: 'concept',
            content: {
              title: 'Understanding RICE Components',
              keyPoints: [
                '📊 Reach: How many users will this impact? (per quarter)',
                '💥 Impact: How much will it impact each user? (0.25 to 3)',
                '🎯 Confidence: How sure are you? (50%, 80%, 100%)',
                '⏱️ Effort: How many person-months?',
              ],
              text: 'RICE Score = (Reach × Impact × Confidence) / Effort',
            },
          },
          {
            id: 'slide-3',
            type: 'scenario',
            content: {
              title: "Let's Score a Feature! 🎯",
              scenario: "Feature: 'Dark Mode' - How many users will this impact per quarter?",
              options: [
                { id: '1', text: '100 users (low reach)' },
                { id: '2', text: '5,000 users (medium reach)' },
                { id: '3', text: '50,000 users (high reach)' },
                { id: '4', text: "I don't know" },
              ],
              correctAnswer: '2',
              explanation: 'For a feature like Dark Mode, if you have 10,000 active users and 50% would use it, that\'s 5,000 users per quarter. This is a medium reach.',
            },
          },
          {
            id: 'slide-4',
            type: 'scenario',
            content: {
              scenario: "What's the Impact of Dark Mode on each user?",
              options: [
                { id: '1', text: 'Massive (3x)' },
                { id: '2', text: 'High (2x)' },
                { id: '3', text: 'Medium (1x)' },
                { id: '4', text: 'Low (0.5x)' },
              ],
              correctAnswer: '3',
              explanation: 'Dark Mode is nice to have but not critical for most users - it improves experience but doesn\'t fundamentally change behavior. Medium impact (1x).',
            },
          },
          {
            id: 'slide-5',
            type: 'scenario',
            content: {
              scenario: 'If it takes 2 person-months and you\'re 80% confident, what\'s the RICE score? (Reach: 5,000, Impact: 1x)',
              options: [
                { id: '1', text: '500' },
                { id: '2', text: '2000' },
                { id: '3', text: '4000' },
                { id: '4', text: '8000' },
              ],
              correctAnswer: '2',
              explanation: 'RICE = (5000 × 1 × 0.8) / 2 = 2000. This is a HIGH priority feature! 🎯',
            },
          },
          {
            id: 'slide-6',
            type: 'completion',
            content: {
              title: '🎉 Lesson Complete!',
            },
          },
        ],
      },
      {
        id: 'prioritization-3',
        moduleId: 'prioritization',
        title: 'MoSCoW Framework',
        type: 'concept',
        xpReward: 50,
        slides: [
          {
            id: 'slide-1',
            type: 'introduction',
            content: {
              title: 'The MoSCoW Method 📋',
              text: 'A simple prioritization framework that categorizes features into four buckets.',
            },
          },
          {
            id: 'slide-2',
            type: 'concept',
            content: {
              title: 'MoSCoW Categories',
              keyPoints: [
                'MUST have: Critical for launch',
                'SHOULD have: Important but not critical',
                'COULD have: Nice to have if time permits',
                "WON'T have: Not in this release",
              ],
            },
          },
          {
            id: 'slide-3',
            type: 'quiz',
            content: {
              question: 'Which category is for features critical for launch?',
              options: [
                { id: '1', text: 'MUST' },
                { id: '2', text: 'SHOULD' },
                { id: '3', text: 'COULD' },
                { id: '4', text: "WON'T" },
              ],
              correctAnswer: '1',
              explanation: 'MUST have features are critical and non-negotiable - the product cannot launch without them.',
            },
          },
          {
            id: 'slide-4',
            type: 'completion',
            content: {
              title: '🎉 Lesson Complete!',
            },
          },
        ],
      },
    ],
  },
];

