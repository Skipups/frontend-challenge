import { shallowMount } from '@vue/test-utils'

import App from '../../src/App.vue'

const appWrapper = shallowMount(App)
// describe("HelloWorld.vue", () => {  // describe block
//   it("renders props.msg when passed", () => { it block
//     const msg = "new message";
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg: msg }
//     });
//     expect(wrapper.text()).toMatch(msg); expect
//   });
// });

//checking if changeCatagory changes the name of the catagory
describe('testing App.vue button', () => {
  it('onclick sets a new catagory name', () => {
    appWrapper.setData({ changeCatagory: 'SPORTS' })
    const button = appWrapper.find('v-btn')
    button.trigger('click')
    expect(appWrapper.vm.changeCatagory).toBe('HOME')
  })
})
