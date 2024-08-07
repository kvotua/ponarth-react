import React, { ReactNode, useState } from 'react'

interface TokenVerificationProps {
  children: ReactNode
}

const TokenVerification = ({ children }) => {
  const [isValidToken, setIsValidToken] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  return <div></div>
}

export default TokenVerification
