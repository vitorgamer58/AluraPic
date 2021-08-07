import { shallowMount } from '@vue/test-utils'
import Home from '@/components/home/Home.vue'

describe('Example', () => {
  it('Simple test', () => {
    const wrapper = shallowMount(Home)
    const titulo = wrapper.find('h1')
    expect(titulo.element.textContent).toMatch('AluraPic')
  })
})
