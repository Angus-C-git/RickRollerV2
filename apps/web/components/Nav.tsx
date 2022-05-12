import { 
    Box, 
    Button, 
    HStack, 
    useMediaQuery,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    useDisclosure,
    IconButton,
    VStack,
    DrawerCloseButton,
    Divider
} from '@chakra-ui/react'
import { AiOutlineLogin } from 'react-icons/ai'
import { RiLogoutCircleLine } from 'react-icons/ri'
import { BiStats } from 'react-icons/bi'
import { RepeatIcon, HamburgerIcon } from '@chakra-ui/icons'
import { useRouter } from 'next/router' 
import Logo from './Logo'
import { useState } from 'react'


const Nav = () => {
    const router = useRouter()
    const [ isAuthenticated, setIsAuthenticated ] = useState(true)
    const [ showDesktopNav ] = useMediaQuery('(min-width: 768px)')
    const { isOpen, onOpen, onClose } = useDisclosure()

    const logout = () => {
        confirm("Logout (stub) ?")
        setIsAuthenticated(false)

        router.push('/login')
    }

    const AuthenticatedButtons = (
        <>
            <Button 
                bg='teal.300' 
                color='white' 
                size='md'
                boxShadow='dark-lg'
                rightIcon={ <RepeatIcon /> }
                onClick={() => router.push('/')}
            >
                Generate
            </Button>  
            <Button 
                bg='teal.300' 
                color='white' 
                size='md'
                boxShadow='dark-lg'
                rightIcon={ <BiStats /> }
                onClick={() => router.push('/stats')}
            >
                Stats
            </Button>     
            <Button 
                bg='teal.300' 
                color='white' 
                size='md'
                boxShadow='dark-lg'
                rightIcon={ <RiLogoutCircleLine /> }
                onClick={() => logout()}
            >
                Logout
            </Button>  
        </>
    )

    const UnauthenticatedButtons = (
        <>
            <Button 
                bg='teal.300' 
                color='white' 
                size='md'
                rightIcon={ <AiOutlineLogin /> }
                onClick={() => router.push('/login')}
            >
                Login
            </Button>
            <Button 
                bg='teal.300' 
                color='white' 
                size='md'
                rightIcon={ <AiOutlineLogin /> }
                onClick={() => router.push('/register')}
            >
                Register
            </Button>
        </>
    )


    // show draw on mobile
    const mobileNav = (
        <>
            <IconButton
                aria-label='open draw'
                onClick={onOpen}
                isRound
                variant="ghost"
                size="lg"
                color="white"
                icon={<HamburgerIcon />}
            />
            
            <Drawer placement='right' isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent bg='gray.700'>
                    <DrawerCloseButton color='white' />
                    <DrawerHeader color='white'>
                        Pages    
                    </DrawerHeader>
                    <Box w='85%' alignSelf='center'>
                        <Divider />
                    </Box>
                    <VStack spacing={6} align='stretch' m={5}>
                        { isAuthenticated ? 
                            AuthenticatedButtons
                        :
                            UnauthenticatedButtons
                        }
                    </VStack>
                </DrawerContent>
            </Drawer>
        </>
    )

    return (
        <Box 
            w='100%' 
            bg='cyan.700' 
            boxShadow='dark-lg' 
            mb='5' 
            minWidth='350' 
            height='70px'
        >
            <HStack 
                spacing={4} 
                justify='space-between' 
                ml='5'
                mr='5' 
                pt='2.5'
                align='center'
            >
                <Logo />
                {showDesktopNav &&
                    <HStack spacing={3}>
                        { isAuthenticated ? 
                            AuthenticatedButtons
                        :
                            UnauthenticatedButtons
                        }
                    </HStack>
                }
                {!showDesktopNav && mobileNav}
            </HStack>
        </Box>
    );
}

export default Nav;