'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { MacroInput, MacroResult } from '@/types'

interface CalculatorState {
  input: MacroInput | null
  result: MacroResult | null
  emailCaptured: boolean
  email: string
  firstName: string
}

interface CalculatorActions {
  setInput: (input: MacroInput) => void
  setResult: (result: MacroResult) => void
  setEmailCaptured: (v: boolean) => void
  setEmail: (email: string) => void
  setFirstName: (name: string) => void
  reset: () => void
}

const initialState: CalculatorState = {
  input: null,
  result: null,
  emailCaptured: false,
  email: '',
  firstName: '',
}

export const useCalculatorStore = create<CalculatorState & CalculatorActions>()(
  persist(
    (set) => ({
      ...initialState,
      setInput: (input) => set({ input }),
      setResult: (result) => set({ result }),
      setEmailCaptured: (emailCaptured) => set({ emailCaptured }),
      setEmail: (email) => set({ email }),
      setFirstName: (firstName) => set({ firstName }),
      reset: () => set(initialState),
    }),
    {
      name: 'macro-calc',
      storage: createJSONStorage(() =>
        typeof window !== 'undefined' ? sessionStorage : { getItem: () => null, setItem: () => {}, removeItem: () => {} }
      ),
    }
  )
)
