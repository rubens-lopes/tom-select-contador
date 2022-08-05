const obterNumber = (px) => Number(px.replace(/px/, ``))

export default function () {
  const self = this
  const itensEscondidos = new Map()
  const itensAVista = new Map()
  let espacoDisponivel = 0

  const html = document.createElement(`div`)
  html.classList.add(`contador`)

  const obterEspacoDisponivel = () => {
    const paddingLeft = obterNumber(window
      .getComputedStyle(self.control, null)
      .getPropertyValue('padding-left'))

    const paddingRight = obterNumber(window
      .getComputedStyle(self.control, null)
      .getPropertyValue('padding-right'))

    const borderRight = obterNumber(window
      .getComputedStyle(self.control, null)
      .getPropertyValue('border-right-width'))

    const borderLeft = obterNumber(window
      .getComputedStyle(self.control, null)
      .getPropertyValue('border-left-width'))

    return self.control.getBoundingClientRect().width - borderLeft - borderRight - paddingLeft - paddingRight
  }
  const atualizarContador = () => {
    html.innerHTML = itensEscondidos.size ? `+${itensEscondidos.size}` : ``
  }

  self.hook(`after`, `setup`, () => {
    self.control.appendChild(html)

    espacoDisponivel = obterEspacoDisponivel()
  })

  self.on(`clear`, () => {
    espacoDisponivel = obterEspacoDisponivel()
  })

  self.on('item_remove', (value) => {
    if (itensEscondidos.has(value)) {
      itensEscondidos.delete(value)
      atualizarContador()

      return
    }

    if (itensAVista.has(value)) {
      const { width } = itensAVista.get(value)
      espacoDisponivel += width
      itensAVista.delete(value)
    }

    if (itensEscondidos.size === 0)
      return

    let temEspaco = false
    do {
      const iterator = itensEscondidos.entries()
      const { value: entry } = iterator.next()
      const [key, { item, width }] = entry

      temEspaco = espacoDisponivel > width

      if (temEspaco) {
        espacoDisponivel -= width
        item.classList.remove(`escondido`)

        itensEscondidos.delete(key)
        itensAVista.set(key, { item, width })
        atualizarContador()
      }
    } while (itensEscondidos.size > 0 && temEspaco)
  })

  self.on('item_add', (value, item) => {
    const width = item.getBoundingClientRect().width

    if (espacoDisponivel < width) {
      item.classList.add(`escondido`)
      itensEscondidos.set(value, { item, width })
    }
    else {
      itensAVista.set(value, { item, width })
      espacoDisponivel -= width
    }

    atualizarContador()
  })
}
