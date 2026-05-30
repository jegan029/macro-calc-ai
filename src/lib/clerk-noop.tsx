'use client'
import React from 'react'

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

export function Show({ children, when }: { children: React.ReactNode; when: string }) {
  // Without auth, treat everyone as signed-out
  return when === 'signed-out' ? <>{children}</> : null
}

export function UserButton() { return null }

export function SignInButton({ children }: { children?: React.ReactNode }) {
  return <>{children}</>
}

export function UserProfile() { return null }
