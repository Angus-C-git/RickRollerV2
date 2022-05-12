import { 
    Box, 
    ChakraProvider, Heading, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import AuthForm from '../components/AuthForm';
import Nav from '../components/Nav';

export default function Register() {
    const toast = useToast()
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    
    const handleRegister = () => {
        // validate form
        if (username.length < 1 || email.length < 1 || password.length < 1) {
            // toast alert
            toast({
                title: 'Please fill out all fields',
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }

        console.log(
            `[>>] registering -> username: ${username}, email: ${email}, password: ${password}`
        )
    }

    return (
        <ChakraProvider>
            <Box bg='gray.700' height='100vh'>

                <Nav />

                <Box 
                    display='flex' 
                    justifyContent='center' 
                    alignItems='center' 
                    height='100vh'
                >
                    <Box 
                        bg='gray.800' 
                        w='55%'
                        h='55%' 
                        borderRadius='15px' 
                        minHeight='500px'
                        maxWidth='600px'
                        minWidth='350px'
                        boxShadow='dark-lg'
                    >
                        <Heading as='h3' color='white' textAlign='center' mt='4'>
                            Register
                        </Heading>
                
                        {/* LOGIN FORM */}
                        <AuthForm 
                            isRegister
                            setUsername={setUsername}
                            username={username}
                            setEmail={setEmail}
                            email={email}
                            setPassword={setPassword}
                            password={password}
                            submit={handleRegister}
                        />
                    </Box>
                </Box>
            </Box>
        </ChakraProvider>
    )    
}
