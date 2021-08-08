import { mount } from '@vue/test-utils'
import Botao from '@/components/shared/botao/Botao.vue'

describe('Teste do componente Botao', () => {
  it('Botão deve receber a classe botao-perigo', () => {
    const wrapper = mount(Botao, {
      propsData: {
        tipo: 'button',
        rotulo: 'Clique aqui',
        confirmacao: false,
        estilo: 'perigo'
      }
    })
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Clique aqui')
    expect(button.classes()).toContain('botao-perigo')
  })

  it('Botão deve receber a classe padrao', () => {
    const wrapper = mount(Botao, {
      propsData: {
        tipo: 'button',
        rotulo: 'Clique aqui',
        confirmacao: false
      }
    })
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Clique aqui')
    expect(button.classes()).toContain('botao-padrao')
  })
})