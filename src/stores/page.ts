// export a page title constant

import { acceptHMRUpdate, defineStore } from 'pinia'

export const usePageStore = defineStore('page-store', () => {
  const pageData = ref({
    title: 'Home',
    description: 'This is the home page'
  })

  return {
    pageData
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
}
