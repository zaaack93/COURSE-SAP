import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { getReadingMinutes } from './courseSummaries'

export function SummaryContent({ guide }) {
  return <>
    <p className="reader-intro">{guide.intro}</p>
    <p className="reader-scope"><strong>Coverage:</strong> {guide.coverage}</p>
    {guide.notice && <p className="reader-notice">{guide.notice} <a href="https://discovery-center.cloud.sap/missiondetail/4327/4608/" target="_blank" rel="noopener noreferrer">Updated mission ↗</a></p>}
    <p className="reader-note">Condensed study notes for course-quiz revision, reviewed 5 October 2026. Examples and practice questions are original, not official SAP assessment questions. These notes cover the main topics; they do not reproduce every video, exercise, or assessment detail.</p>
    <nav className="reader-toc" aria-label="Summary chapters">
      <h3>In this summary</h3>
      <ol>{guide.sections.map((section, i) => <li key={section.title}>
        <a href={`#summary-chapter-${i}`}>{section.title}</a>
      </li>)}</ol>
      <a href="#summary-terms">Key terms</a>
      {guide.lessons && <a href="#summary-lessons">21 lesson recaps</a>}
      <a href="#summary-revision">Final revision checklist</a>
    </nav>
    <section id="summary-terms" className="reader-section">
      <h3>Key terms at a glance</h3>
      <dl className="reader-terms">{guide.terms.map(([term, meaning]) => <div key={term}>
        <dt>{term}</dt><dd>{meaning}</dd>
      </div>)}</dl>
    </section>
    {guide.sections.map((section, i) => <section className="reader-section" id={`summary-chapter-${i}`} key={section.title}>
      <p className="eyebrow">Chapter {i + 1} of {guide.sections.length}</p>
      <h3>{section.title}</h3>
      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      <div className="reader-example"><strong>Example</strong><p>{section.example}</p></div>
      <p className="reader-takeaway"><strong>Remember:</strong> {section.remember}</p>
      <div className="reader-question">
        <h4>Check your understanding</h4>
        <p>{section.question}</p>
        <details><summary>Reveal answer and explanation</summary><p>{section.answer}</p></details>
      </div>
      <a className="reader-source" href={section.source} target="_blank" rel="noopener noreferrer">SAP reference: {section.title} ↗</a>
    </section>)}
    {guide.lessons && <section id="summary-lessons" className="reader-section">
      <h3>All 21 lesson recaps</h3>
      {guide.lessons.map((unit) => <section key={unit.title}>
        <h4>{unit.title}</h4>
        {unit.lessons.map((lesson) => <article className="reader-lesson" key={lesson.url}>
          <h5>{lesson.title}</h5><p>{lesson.summary}</p>
          <a className="reader-source" href={lesson.url} target="_blank" rel="noopener noreferrer">SAP lesson reference ↗<span className="sr-only">: {lesson.title}</span></a>
        </article>)}
      </section>)}
    </section>}
    <section id="summary-revision" className="reader-section">
      <h3>Before you take the course quiz</h3>
      <p>Explain each point below in your own words. If you are unsure, revisit that chapter and try its question before revealing the answer.</p>
      <ul className="reader-checklist">{guide.sections.map((section) => <li key={section.title}>{section.remember}</li>)}</ul>
      <p className="reader-note">Reading a summary does not mark tracker tasks or SAP course quizzes as complete.</p>
    </section>
  </>
}

export default function SummaryReader({ guide, onClose }) {
  const dialogRef = useRef(null)
  useEffect(() => {
    const dialog = dialogRef.current
    const opener = document.activeElement
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus({ preventScroll: true })
    }
  }, [])

  return createPortal(<dialog ref={dialogRef} className="summary-reader" aria-labelledby="summary-reader-title"
    onCancel={(event) => { event.preventDefault(); onClose() }}>
    <header className="reader-header">
      <div>
        <p className="eyebrow">Detailed course summary · About {getReadingMinutes(guide)} min to read</p>
        <h2 id="summary-reader-title">{guide.title}</h2>
      </div>
      <button type="button" className="reader-close" onClick={onClose} autoFocus aria-label="Close summary">Close ×</button>
    </header>
    <div className="reader-body"><SummaryContent guide={guide} /></div>
  </dialog>, document.body)
}
