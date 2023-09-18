declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      PORT?: string
      PWD: string
      URL_DB: string
      DB_NAME: string
    }
  }
  namespace Express {
    export interface Request {
      user: {
        _id: string
        role: string
        operatorId: string
        email: string
        name: string
        agentId: string
      }
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
