"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Generic React Error Boundary for catching unexpected render errors.
 * Wraps components that depend on external data (e.g. Firestore) so a
 * thrown exception doesn't crash the whole page.
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="rounded-xl bg-red-50 border border-red-100 p-6 text-center text-sm text-red-600">
            Something went wrong. Please refresh the page.
          </div>
        )
      );
    }
    return this.props.children;
  }
}
