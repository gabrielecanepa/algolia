// const WIDGETS = process.env.WIDGETS
const WIDGETS = ['gs-cockpit-widget', 'gs-portfolio-csm', 'gs-timeline-widget-element']

const links = WIDGETS.reduce((elements, widget) => {
  const component = document.querySelector(widget)
  return component ? [...elements, ...(component.shadowRoot || component).querySelectorAll('a')] : elements
}, [])

for (const link of links) {
  link.removeAttribute('target')
}
