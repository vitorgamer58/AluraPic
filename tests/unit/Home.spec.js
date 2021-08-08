import { mount, RouterLinkStub } from '@vue/test-utils'
import Home from '../../src/components/home/Home.vue'
import { lista } from '../../src/http'
import flushPromises from 'flush-promises'

jest.mock('../../src/http')

const fotos = [{"titulo":"BITCAO","url":"https://imgr.search.brave.com/sLGUdKSuy0paulkbSJckQwPQ5P6MFN9PujRS-cQ8-bs/fit/1200/1080/no/1/aHR0cHM6Ly9jZG4u/MjQuY28uemEvZmls/ZXMvQ21zL0dlbmVy/YWwvZC8xMDgwMS8x/YzRkZmNkNGUyNWE0/NGM0OGNmMjEyNzY1/NmIzMWE5MC5qcGc","descricao":"Bitcoin é TOP","_id":"vgcqJNRTNRAzIVmx"},{"titulo":"ImagemDeTeste", "url":"https://abc123","descricao":"Descricaodeteste"}]

describe('Test home', () => {
  it('Simple test', async () => {
    lista.mockResolvedValueOnce(fotos)
    const wrapper = mount(Home, {
      stubs: {
        RouterLink: RouterLinkStub,
      }
    })
    await flushPromises() // Aguarda todas as Promises serem resolvidas

    const titulo = wrapper.find('h1')
    expect(titulo.element.textContent).toMatch('AluraPic')
    const totalDeFotos = wrapper.findAll('.lista-fotos-item')
    expect(totalDeFotos.length).toBe(fotos.length)
  })
})
