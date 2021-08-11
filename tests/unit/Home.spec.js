import { mount, RouterLinkStub } from '@vue/test-utils'
import Home from '../../src/components/home/Home.vue'
import { lista } from '../../src/http'
import flushPromises from 'flush-promises'
import { apaga } from '../../src/http'

jest.mock('../../src/http')

const fotos = [{"titulo":"BITCAO","url":"https://imgr.search.brave.com/sLGUdKSuy0paulkbSJckQwPQ5P6MFN9PujRS-cQ8-bs/fit/1200/1080/no/1/aHR0cHM6Ly9jZG4u/MjQuY28uemEvZmls/ZXMvQ21zL0dlbmVy/YWwvZC8xMDgwMS8x/YzRkZmNkNGUyNWE0/NGM0OGNmMjEyNzY1/NmIzMWE5MC5qcGc","descricao":"Nano é TOP","_id":"vgcqJNRTNRAzIVmx"},{"titulo":"ImagemDeTeste", "url":"https://abc123","descricao":"Descricaodeteste"}]

let wrapper;

describe('Test home', () => {
  beforeEach(async() => {
    lista.mockResolvedValueOnce(fotos)
    wrapper = mount(Home, {
      stubs: {
        RouterLink: RouterLinkStub,
      }
    })
    await flushPromises() // Aguarda todas as Promises serem resolvidas
  })
  it('Simple test', async () => {
    const titulo = wrapper.find('h1')
    expect(titulo.element.textContent).toMatch('AluraPic')
    const totalDeFotos = wrapper.findAll('.lista-fotos-item')
    expect(totalDeFotos.length).toBe(fotos.length)
  })
  it('Should filter', async () => {
    await wrapper.find('input').setValue('Bit')
    await wrapper.vm.$nextTick()
    const totalDeFotos = wrapper.findAll('.lista-fotos-item')
    expect(totalDeFotos.length).toBe(1)
  })
  it('Shoud remove Foto', async () => {
    apaga.mockResolvedValueOnce({})
    window.confirm = () => true
    //wrapper.findComponent(Botao).vm.$emit('botaoAtivado', "vgcqJNRTNRAzIVmx")
    await wrapper.find('input').setValue('Bit')
    await wrapper.vm.$nextTick()
    const botaoRemover = wrapper.find('[data-cy="apagar"]')
    await botaoRemover.trigger('click')
    await wrapper.find('input').setValue('')
    await flushPromises()
    await wrapper.vm.$nextTick()
    const totalDeFotos = wrapper.findAll('.lista-fotos-item')
    expect(totalDeFotos.length).toBe(1)
  })
})

describe('Should test Cadastru.vue', () => {
  beforeEach(async() => {
    lista.mockResolvedValueOnce(fotos)
    wrapper = mount(Home, {
      stubs: {
        RouterLink: RouterLinkStub,
      }
    })
    await flushPromises() // Aguarda todas as Promises serem resolvidas
  })
  it('Should go to /cadastro and include a photo', async () => {
    const link = await wrapper.find('[data-cy="Cadastro"]')
    await link.trigger('click')
    await wrapper.vm.$nextTick()
    await wrapper.find('#titulo').setValue('titulo de teste')
    await wrapper.find('[data-cy="url"]').setValue('https://www.ifrr.edu.br/midia/teste/image')
    await wrapper.find('#descricao').setValue('descricaodeteste')
    await wrapper.find('[data-cy="gravar"]').trigger('click')
  })
})
