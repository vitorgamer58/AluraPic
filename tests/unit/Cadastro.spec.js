import { mount, RouterLinkStub, shallowMount } from '@vue/test-utils'
import Cadastro from '../../src/components/cadastro/Cadastro.vue'
import flushPromises from 'flush-promises'
import { cadastra, busca } from '../../src/http'

jest.mock('../../src/http')

const fotos = [{"titulo":"BITCAO","url":"https://imgr.search.brave.com/sLGUdKSuy0paulkbSJckQwPQ5P6MFN9PujRS-cQ8-bs/fit/1200/1080/no/1/aHR0cHM6Ly9jZG4u/MjQuY28uemEvZmls/ZXMvQ21zL0dlbmVy/YWwvZC8xMDgwMS8x/YzRkZmNkNGUyNWE0/NGM0OGNmMjEyNzY1/NmIzMWE5MC5qcGc","descricao":"Nano é TOP","_id":"vgcqJNRTNRAzIVmx"},{"titulo":"ImagemDeTeste", "url":"https://abc123","descricao":"Descricaodeteste"}]

let wrapper;

describe('Test home', () => {
  beforeEach(() => {
    
  })
  it('Should include a new photo', async () => {
    wrapper = shallowMount(Cadastro, {
      stubs: {
        RouterLink: RouterLinkStub,
      }
    })
    await wrapper.vm.$nextTick()
    cadastra.mockResolvedValueOnce({ data: 'XXXXX'})
    await wrapper.find('#titulo').setValue('titulo de teste')
    await wrapper.find('[data-cy="url"]').setValue('https://www.ifrr.edu.br/midia/teste/image')
    await wrapper.find('#descricao').setValue('descricaodeteste')
    await wrapper.find('[data-cy="gravar"]').trigger('click')
  })
})
