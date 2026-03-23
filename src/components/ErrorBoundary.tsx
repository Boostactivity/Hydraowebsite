import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
    // if (window.gtag) {
    //   window.gtag('event', 'exception', {
    //     description: error.message,
    //     fatal: true
    //   });
    // }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6">
          <div className="max-w-md w-full">
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#6B1E3E]/10 flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-[#6B1E3E]" />
              </div>
              
              <h1 className="text-3xl mb-4 text-gray-900">
                Une erreur est survenue
              </h1>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                Nous sommes désolés, quelque chose s'est mal passé. Notre équipe technique a été notifiée.
              </p>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-left">
                  <p className="text-sm text-red-800 font-mono break-all">
                    {this.state.error.message}
                  </p>
                </div>
              )}

              <button
                onClick={this.handleReset}
                className="px-8 py-4 gradient-bordeaux text-white rounded-full shadow-lg hover:shadow-xl transition-all font-medium"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
