import TomSelect from 'tom-select'
import TomSelectContador from './plugins/contador'
import 'tom-select/dist/css/tom-select.css'
import './index.css'

TomSelect.define(`contador`, TomSelectContador)

const opcoes = {
  plugins: {
    clear_button: { title: `Remover todos` },
    remove_button: { title: `Remover` },
    checkbox_options: true,
    dropdown_input: true,
    contador: true,
  },
}

new TomSelect(`select[multiple]`, opcoes)