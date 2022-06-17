import { 
    Box, 
    Center, 
    FormControl, 
    FormLabel, 
    Input, 
    InputGroup, 
    InputLeftElement, 
    VStack,
    Icon,
    Button,
    useToast
} from '@chakra-ui/react'
import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import { FaUserAlt } from 'react-icons/fa'
import { AiOutlineLogin } from 'react-icons/ai'
import { useState } from 'react'
import axios from 'axios'
import { API_BASE } from '../utils/constants'

interface AuthFormProps {
    isRegister?: boolean
    setUsername: Function
    username: string
    setEmail?: Function
    email?: string
    setPassword: Function
    password: string
    submit?: Function
}

const AuthForm = ({ 
    isRegister, 
    setUsername,
    username, 
    setEmail, 
    email,
    setPassword,
    password,
    submit
}: AuthFormProps ) => {
    const toast = useToast()
    // error handling
    const [ usernameError, setUsernameError ] = useState(false)
    const [ passwordError, setPasswordError ] = useState(false)
    const [ emailError, setEmailError ] = useState(false)

    // load handling
    const [ isLoading, setIsLoading ] = useState(false)
    
    const login = () => {
        console.log('[>>] logging in')
        axios.post(`${API_BASE}/auth/login`, {
            username,
            password
        },{ withCredentials: true }).then(response => {
            console.log(`[<<] logged in token :: ${response.data.access_token}`)
            
            toast({
                title: 'Login Success',
                status: 'success',
                position: 'bottom-left',
                duration: 5000,
                isClosable: false
            })

        }).catch(error => {
            console.log('[>>] login error')
            console.log(error)

            // show error toast
            toast({
                title: 'Error',
                description: 'Invalid username or password',
                position: 'bottom-left',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })

            // set error state
            setUsernameError(true)
            setPasswordError(true)

        }).finally(() => {
            setIsLoading(false)
        })
    }

    const register = () => {
        console.log('[>>] registering')
        axios.post(`${API_BASE}/auth/register`, {
            username,
            password,
            email
        }, { withCredentials: true }).then(response => {
            console.log(`[>>] register success ${response.data.access_token}`)

            toast({
                title: 'Register Success',
                status: 'success',
                position: 'bottom-right',
                duration: 5000,
                isClosable: false
            })
        }
        ).catch(error => {

            // show error toast
            toast({
                title: 'Error',
                description: 'Username or email already exists',
                status: 'error',
                duration: 9000,
                isClosable: true,
            })

            // set error state
            setUsernameError(true)
            setEmailError(true)
            
        })
    }

    const handleSubmit = () => {

        // start loading
        setIsLoading(true)

        // clear errors
        setUsernameError(false)
        setPasswordError(false)
        setEmailError(false)

        // validate form
        if (username.length < 1)
            setUsernameError(true)
        
        if (password.length < 1)
            setPasswordError(true)

        if (isRegister && email.length < 1)
            setEmailError(true)

        if (username.length < 1 || (isRegister && email.length < 1) || password.length < 1) {
            // toast alert
            toast({
                title: 'Please fill out all fields',
                status: 'error',
                position: 'bottom-left',
                duration: 3000,
                isClosable: true,
            })
            return 
        }

        if (isRegister)
            register()
        else
            login()

    }

    return (
        <Box>
            {/* LOGIN FORM */}
            <Center mt='10'>
                <VStack spacing={50}>
                    <FormControl>
                        <VStack spacing={5}>
                            <Box>
                
                                <FormLabel color='white'>
                                    Username
                                </FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        children={<Icon as={FaUserAlt} color='gray.300' />}
                                    />
                                    <Input 
                                        name='username' 
                                        type='text' 
                                        color='white' 
                                        size='lg' 
                                        placeholder='username'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        isInvalid={usernameError}
                                    />
                                </InputGroup>
                            </Box>

                            { isRegister && 
                                <Box>
                                    <FormLabel color='white'>
                                        Email
                                    </FormLabel>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            children={<EmailIcon color='gray.300' />}
                                        />
                                        <Input 
                                            name='email' 
                                            type='email' 
                                            color='white' 
                                            size='lg'
                                            placeholder='email'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            isInvalid={emailError}
                                        />                    
                                    </InputGroup>
                                </Box>
                            }

                            <Box>
                                <FormLabel color='white'>
                                    Password
                                </FormLabel>
                                <InputGroup>
                                    <InputLeftElement
                                        pointerEvents='none'
                                        children={<LockIcon color='gray.300' />}
                                    />
                                    <Input 
                                        name='password' 
                                        type='password' 
                                        color='white' 
                                        size='lg'
                                        placeholder='password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        isInvalid={passwordError}
                                    />
                                </InputGroup> 
                            </Box>

                        </VStack>
                    </FormControl>
                    {/* SUBMIT */}
                    <Box mt='25' alignSelf='center'>
                        <Button 
                            bg='teal.300' 
                            color='white' 
                            boxShadow='dark-lg'
                            rightIcon={ <AiOutlineLogin /> }
                            isLoading={isLoading}
                            onClick={() => handleSubmit()}
                        >
                            { isRegister ? 'REGISTER' : 'LOGIN' }
                        </Button>
                    </Box>
                </VStack>
            </Center>
        </Box>
    )
}

export default AuthForm