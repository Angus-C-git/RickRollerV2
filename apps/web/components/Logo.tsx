import { 
    Heading, 
    Circle,  
    HStack 
} from '@chakra-ui/react'
import { useRouter } from 'next/router' 
import Image from 'next/image'


const Logo = () => {
    const router = useRouter()
    return (   
        <HStack 
            zIndex={3} 
            align='baseline' 
            onClick={() => router.push('/')} 
            _hover={{cursor: 'pointer'}}
        >
            <Circle size='45px' bg='teal.300'>
                <Image 
                    src='/hook.png' 
                    alt='logo' 
                    width='25px' 
                    height='20px' 
                /> 
            </Circle>
            <Heading as='h1' size='lg' fontWeight='bold' color='white'>
                 RickRollerV2 
            </Heading>    
        </HStack>
    );
};

export default Logo;