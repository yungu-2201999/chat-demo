import { create } from 'zustand'

const useStore = create((set) => ({
  chatTags: [],
  setChatTags: (newTags:any[]) => {
    set({ chatTags: newTags })
  },

}))

export { useStore }
