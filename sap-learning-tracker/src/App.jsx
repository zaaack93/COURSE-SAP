import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { taskGuides, btpUnits } from './courseGuides'
import { courseSummaries, summaryForResource } from './courseSummaries'
import SummaryReader from './SummaryReader'

const STORAGE_KEY = 'sap-learning-tracker-weeks'

const loadStoredWeeks = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return roadmap

    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed) || parsed.length === 0) return roadmap

    // Keep current course content while preserving existing completion by stable ID.
    return roadmap.map((week) => ({
      ...week,
      tasks: week.tasks.map((task) => ({
        ...task,
        done: parsed.find((saved) => saved?.id === week.id)?.tasks?.find(
          (saved) => saved?.id === task.id,
        )?.done === true,
      })),
    }))
  } catch {
    return roadmap
  }
}

const roadmap = [
  {
    id: 1,
    label: 'Week 1',
    title: 'SAP BTP Fundamentals',
    focus: 'SAP BTP strategy, architecture, integration, and security',
    resource: 'https://learning.sap.com/courses/exploring-sap-business-technology-platform',
    isCurrent: true,
    tasks: [
      { id: 'w1-1', text: 'Learn SAP BTP fundamentals and strategy', done: false },
      { id: 'w1-2', text: 'Study SAP BTP architecture and services', done: false },
      { id: 'w1-3', text: 'Review application development options for BTP', done: false },
      { id: 'w1-4', text: 'Understand BTP integration and security fundamentals', done: false },
      { id: 'w1-5', text: 'Create your first SAP architecture diagram', done: false },
    ],
  },
  {
    id: 2,
    label: 'Week 2',
    title: 'Operating SAP BTP',
    focus: 'Accounts, runtimes, IAM, connectivity, monitoring',
    resource: 'https://learning.sap.com/courses/operating-sap-business-technology-platform',
    isCurrent: false,
    tasks: [
      { id: 'w2-1', text: 'Learn account structure and BTP organization', done: false },
      { id: 'w2-2', text: 'Understand runtime environments and Cloud Foundry', done: false },
      { id: 'w2-3', text: 'Review Identity and Access Management', done: false },
      { id: 'w2-4', text: 'Understand setup, configuration, and connectivity', done: false },
      { id: 'w2-5', text: 'Study observability and monitoring', done: false },
    ],
  },
  {
    id: 3,
    label: 'Week 3',
    title: 'BTP Cloud Foundry Development',
    focus: 'Cloud Foundry runtime, deployment, and app operations',
    resource: 'https://learning.sap.com/courses/developing-applications-for-sap-btp-cloud-foundry-runtime',
    isCurrent: false,
    tasks: [
      { id: 'w3-1', text: 'Understand how applications run on Cloud Foundry', done: false },
      { id: 'w3-2', text: 'Learn application development in Cloud Foundry', done: false },
      { id: 'w3-3', text: 'Study deployment concepts and deploy a small app', done: false },
      { id: 'w3-4', text: 'Review app optimization and management', done: false },
      { id: 'w3-5', text: 'Connect the runtime to your Node.js background', done: false },
    ],
  },
  {
    id: 4,
    label: 'Week 4',
    title: 'CAP Foundations',
    focus: 'CAP overview, CDS, services, OData, and project setup',
    resource: 'https://learning.sap.com/courses/introduction-to-sap-cloud-application-programming-model',
    isCurrent: false,
    tasks: [
      { id: 'w4-1', text: 'Study the CAP introduction and architecture', done: false },
      { id: 'w4-2', text: 'Set up a CAP project and entity model', done: false },
      { id: 'w4-3', text: 'Create CDS models, services, and OData exposure', done: false },
      { id: 'w4-4', text: 'Review CAP + Node.js event and service flow', done: false },
      { id: 'w4-5', text: 'Use SQLite locally and test the app', done: false },
    ],
  },
  {
    id: 5,
    label: 'Week 5',
    title: 'CAP Business Logic + Security',
    focus: 'Custom logic, validation, auth, external services',
    resource: 'https://learning.sap.com/courses/develop-extensions-with-cap-following-the-sap-btp-developer-s-guide',
    isCurrent: false,
    tasks: [
      { id: 'w5-1', text: 'Add custom business logic and validation', done: false },
      { id: 'w5-2', text: 'Learn CAP authorization and trust management', done: false },
      { id: 'w5-3', text: 'Consume an external service in the CAP app', done: false },
      { id: 'w5-4', text: 'Build Product CRUD and business rules', done: false },
      { id: 'w5-5', text: 'Prepare notes for auth and external API integration', done: false },
    ],
  },
  {
    id: 6,
    label: 'Week 6',
    title: 'CAP Deployment + Work Zone',
    focus: 'Deploy CAP app and integrate it into business workflows',
    resource: 'https://learning.sap.com/courses/develop-extensions-with-cap-following-the-sap-btp-developer-s-guide',
    isCurrent: false,
    tasks: [
      { id: 'w6-1', text: 'Deploy the CAP application to BTP', done: false },
      { id: 'w6-2', text: 'Study integration into SAP Build Work Zone', done: false },
      { id: 'w6-3', text: 'Follow the full-stack CAP tutorial', done: false },
      { id: 'w6-4', text: 'Compare tutorial architecture with your project', done: false },
      { id: 'w6-5', text: 'Update README and deployment notes', done: false },
    ],
  },
  {
    id: 7,
    label: 'Week 7',
    title: 'Fiori Elements',
    focus: 'List report, object page, filters, and UI configuration',
    resource: 'https://developers.sap.com/tutorials/add-fiori-elements-uis',
    isCurrent: false,
    tasks: [
      { id: 'w7-1', text: 'Generate a Fiori Elements UI based on CAP OData', done: false },
      { id: 'w7-2', text: 'Run the application locally and validate it', done: false },
      { id: 'w7-3', text: 'Configure the List Report and filters', done: false },
      { id: 'w7-4', text: 'Configure the Product Object Page', done: false },
      { id: 'w7-5', text: 'Complete the Product List + Object Page flow', done: false },
    ],
  },
  {
    id: 8,
    label: 'Week 8',
    title: 'Clean Core + Architecture',
    focus: 'Clean Core, upgrade-safe design, Shopify-to-SAP architecture',
    resource: 'https://learning.sap.com/courses/managing-clean-core-for-sap-cloud-erp',
    isCurrent: false,
    tasks: [
      { id: 'w8-1', text: 'Understand Clean Core and its business value', done: false },
      { id: 'w8-2', text: 'Review the benefits and principles of Clean Core', done: false },
      { id: 'w8-3', text: 'Map Clean Core to SAP Cloud ERP strategy', done: false },
      { id: 'w8-4', text: 'Design Shopify → Integration → S/4HANA architecture', done: false },
      { id: 'w8-5', text: 'Document APIs, auth, monitoring, and error handling', done: false },
    ],
  },
  {
    id: 9,
    label: 'Week 9',
    title: 'Integration Suite Fundamentals',
    focus: 'API Management, Cloud Integration, Event Mesh, architecture',
    resource: 'https://learning.sap.com/learning-journeys/developing-with-sap-integration-suite',
    isCurrent: false,
    tasks: [
      { id: 'w9-1', text: 'Start the Integration Suite learning journey', done: false },
      { id: 'w9-2', text: 'Understand Integration Suite architecture and capabilities', done: false },
      { id: 'w9-3', text: 'Study API Management and API proxies', done: false },
      { id: 'w9-4', text: 'Understand Cloud Integration and message processing', done: false },
      { id: 'w9-5', text: 'Learn Event Mesh and event-driven integration', done: false },
    ],
  },
  {
    id: 10,
    label: 'Week 10',
    title: 'Integration Development',
    focus: 'Integration flow, APIs, event-driven design, monitoring',
    resource: 'https://learning.sap.com/courses/sap-cloud-platform-integration-service-overview',
    isCurrent: false,
    tasks: [
      { id: 'w10-1', text: 'Design an API-management approach', done: false },
      { id: 'w10-2', text: 'Design a Shopify webhook → validation → transformation → SAP API flow', done: false },
      { id: 'w10-3', text: 'Decide when an event-based flow should be asynchronous', done: false },
      { id: 'w10-4', text: 'Review the admin perspective and monitoring concepts', done: false },
      { id: 'w10-5', text: 'Document how to troubleshoot failed integrations', done: false },
    ],
  },
  {
    id: 11,
    label: 'Week 11',
    title: 'Shopify → SAP Flagship Project',
    focus: 'Build the real integration project and architecture package',
    resource: 'https://learning.sap.com/learning-journeys/developing-with-sap-integration-suite',
    isCurrent: false,
    tasks: [
      { id: 'w11-1', text: 'Receive and validate a Shopify order webhook', done: false },
      { id: 'w11-2', text: 'Design the Integration Flow and SAP API connection', done: false },
      { id: 'w11-3', text: 'Transform the Shopify payload into an SAP-compatible structure', done: false },
      { id: 'w11-4', text: 'Document API security, policies, and event decisions', done: false },
      { id: 'w11-5', text: 'Create the project folder and architecture docs', done: false },
    ],
  },
  {
    id: 12,
    label: 'Week 12',
    title: 'Portfolio + Career Preparation',
    focus: 'Finalize projects, explain architecture, and prepare interviews',
    resource: 'https://learning.sap.com/courses/develop-extensions-with-cap-following-the-sap-btp-developer-s-guide',
    isCurrent: false,
    tasks: [
      { id: 'w12-1', text: 'Complete Project 1 and lock down the CAP deployment', done: false },
      { id: 'w12-2', text: 'Complete Project 2 and finalize the architecture notes', done: false },
      { id: 'w12-3', text: 'Practice explaining the Shopify → SAP architecture without notes', done: false },
      { id: 'w12-4', text: 'Prepare technical answers across BTP, CAP, Fiori, and Integration Suite', done: false },
      { id: 'w12-5', text: 'Polish profile, GitHub, and portfolio presentation', done: false },
    ],
  },
]

const priorityItems = [
  { label: 'Exploring SAP BTP', resource: 'https://learning.sap.com/courses/exploring-sap-business-technology-platform' },
  { label: 'Operating SAP BTP', resource: 'https://learning.sap.com/courses/operating-sap-business-technology-platform' },
  { label: 'Cloud Foundry Development', resource: 'https://learning.sap.com/courses/developing-applications-for-sap-btp-cloud-foundry-runtime' },
  { label: 'Introduction to CAP', resource: 'https://learning.sap.com/courses/introduction-to-sap-cloud-application-programming-model' },
  { label: 'Develop extensions with CAP', resource: 'https://learning.sap.com/courses/develop-extensions-with-cap-following-the-sap-btp-developer-s-guide' },
  { label: 'Add SAP Fiori Elements UIs', resource: 'https://developers.sap.com/tutorials/add-fiori-elements-uis' },
  { label: 'Managing Clean Core', resource: 'https://learning.sap.com/courses/managing-clean-core-for-sap-cloud-erp' },
  { label: 'Developing with SAP Integration Suite', resource: 'https://learning.sap.com/learning-journeys/developing-with-sap-integration-suite' },
  { label: 'SAP Integration Suite Overview', resource: 'https://learning.sap.com/courses/sap-cloud-platform-integration-service-overview' },
  { label: 'Administering SAP Integration Suite', resource: 'https://learning.sap.com/courses/administering-sap-integration-suite' },
]

const projectMilestones = [
  'Build SAP Product Management project in CAP',
  'Add Fiori Elements UI to the CAP application',
  'Document Shopify → SAP integration architecture',
  'Finalize portfolio README and demo-ready project notes',
]

function App() {
  const [weeks, setWeeks] = useState(loadStoredWeeks)
  const [summaryId, setSummaryId] = useState(null)

  const showSummary = (resource) => setSummaryId(summaryForResource(resource))

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(weeks))
  }, [weeks])

  const openResource = (url) => {
    if (!url) return
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const toggleTask = (weekId, taskId) => {
    setWeeks((currentWeeks) =>
      currentWeeks.map((week) =>
        week.id !== weekId
          ? week
          : {
              ...week,
              tasks: week.tasks.map((task) =>
                task.id === taskId ? { ...task, done: !task.done } : task,
              ),
            },
      ),
    )
  }

  const allTasks = useMemo(
    () => weeks.flatMap((week) => week.tasks),
    [weeks],
  )

  const completedTasks = allTasks.filter((task) => task.done).length
  const totalTasks = allTasks.length
  const progressPercent = Math.round((completedTasks / totalTasks) * 100)
  const currentWeek = weeks.find((week) => week.isCurrent) ?? weeks[0]

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">SAP BTP learning tracker</p>
          <h1>Turn your roadmap into a measurable learning sprint.</h1>
        </div>
        <button type="button" className="primary-button">
          Focus mode
        </button>
      </header>

      <section className="overview-grid">
        <article className="stat-card accent-card">
          <span className="label">Overall progress</span>
          <strong>{progressPercent}%</strong>
          <div className="mini-progress">
            <span style={{ width: `${progressPercent}%` }} />
          </div>
          <small>
            {completedTasks}/{totalTasks} tasks complete
          </small>
        </article>

        <article className="stat-card">
          <span className="label">Current focus</span>
          <strong>{currentWeek.label}</strong>
          <p>{currentWeek.title}</p>
        </article>

        <article className="stat-card">
          <span className="label">Career path</span>
          <strong>Full-stack → SAP BTP</strong>
          <p>Developer</p>
        </article>
      </section>

      <section className="content-grid">
        <aside className="panel focus-panel">
          <div className="panel-header">
            <h2>Learning priorities</h2>
            <span className="badge">In order</span>
          </div>

          <ol className="priority-list">
            {priorityItems.map((item, index) => (
              <li key={item.label}>
                <button
                  type="button"
                  className="priority-link"
                  onClick={() => openResource(item.resource)}
                >
                  <span className="priority-number">{String(index + 1).padStart(2, '0')}</span>
                  <span>{item.label}</span>
                </button>
                <button type="button" className="summary-button sidebar-summary" onClick={() => showSummary(item.resource)} aria-label={`View Summary: ${item.label}`} aria-haspopup="dialog">View Summary</button>
              </li>
            ))}
          </ol>

          <div className="divider" />

          <div className="panel-header compact-header">
            <h2>Project milestones</h2>
          </div>

          <ul className="milestone-list">
            {projectMilestones.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>

        <main className="panel weekly-panel">
          <div className="panel-header">
            <h2>12-week roadmap</h2>
            <span className="badge success">Live tracking</span>
          </div>

          <div className="week-grid">
            {weeks.map((week) => {
              const weekCompleted = week.tasks.filter((task) => task.done).length
              const weekProgress = Math.round(
                (weekCompleted / week.tasks.length) * 100,
              )

              return (
                <article
                  key={week.id}
                  className={`week-card ${week.isCurrent ? 'active' : ''}`}
                >
                  <button
                    type="button"
                    className="week-card-button"
                    onClick={() => openResource(week.resource)}
                  >
                    <div className="week-header">
                      <span className="week-tag">{week.label}</span>
                      <span className="week-count">
                        {weekCompleted}/{week.tasks.length}
                      </span>
                    </div>

                    <h3>{week.title}</h3>
                    <p className="week-focus">{week.focus}</p>

                    <div className="mini-progress">
                      <span style={{ width: `${weekProgress}%` }} />
                    </div>
                  </button>

                  <div className="course-actions">
                  <button type="button" className="summary-button" onClick={() => showSummary(week.resource)} aria-label={`View Summary: ${week.label} — ${week.title}`} aria-haspopup="dialog">View Summary</button>
                  <a className="course-button" href={week.resource} target="_blank" rel="noopener noreferrer">
                    View course <span aria-hidden="true">↗</span>
                    <span className="sr-only">: {week.title} (opens in a new tab)</span>
                  </a>
                  </div>
                  {week.id === 7 && <p className="course-note">SAP marks this tutorial as out of maintenance. Use the <a href="https://discovery-center.cloud.sap/missiondetail/4327/4608/" target="_blank" rel="noopener noreferrer">updated full-stack CAP mission ↗</a> for current instructions.</p>}
                  <ul className="task-list">
                    {week.tasks.map((task) => (
                      <li key={task.id}>
                        <label>
                          <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => toggleTask(week.id, task.id)}
                          />
                          <span>{task.text}</span>
                        </label>
                        <div className="task-resources">
                          <button type="button" className="summary-button task-summary" onClick={() => showSummary(taskGuides[task.id]?.url || week.resource)} aria-label={`View Summary: ${task.text}`} aria-haspopup="dialog">View Summary</button>
                          <a href={taskGuides[task.id]?.url || week.resource} target="_blank" rel="noopener noreferrer" className="task-course-link">
                            View course ↗<span className="sr-only">: {task.text} (opens in a new tab)</span>
                          </a>
                          <details className="study-notes">
                            <summary>Study summary</summary>
                            <p>{taskGuides[task.id]?.summary}</p>
                            <p><strong>Practice:</strong> {taskGuides[task.id]?.practice}</p>
                            <small>Study guidance for this roadmap task. Use the linked SAP resource for the full material.</small>
                          </details>
                        </div>
                      </li>
                    ))}
                  </ul>
                  {week.id === 1 && <details className="course-outline">
                    <summary>Full BTP course guide · 21 lessons</summary>
                    <p className="course-note">Reviewed 5 October 2026. Read each summary, open the lesson, then complete the unit quiz on SAP Learning. Quizzes and course completion are recorded by SAP separately from this tracker.</p>
                    {btpUnits.map((unit, index) => <section className="course-unit" key={unit.title}>
                      <h4>{index + 1}. {unit.title}</h4>
                      <ol className="lesson-list">
                        {unit.lessons.map((lesson) => <li key={lesson.url}>
                          <strong>{lesson.title}</strong>
                          <small>{lesson.minutes} min</small>
                          <p>{lesson.summary}</p>
                          <a href={lesson.url} target="_blank" rel="noopener noreferrer">View lesson ↗<span className="sr-only">: {lesson.title} (opens in a new tab)</span></a>
                        </li>)}
                      </ol>
                      <p><strong>Check your understanding:</strong> {unit.check}</p>
                      <p className="course-note">Next: complete this unit’s quiz in the course.</p>
                    </section>)}
                  </details>}
                </article>
              )
            })}
          </div>
        </main>
      </section>
      {summaryId && <SummaryReader key={summaryId} guide={courseSummaries[summaryId]} onClose={() => setSummaryId(null)} />}
    </div>
  )
}

export default App
