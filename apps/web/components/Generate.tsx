import { Heading, Button, Box } from '@chakra-ui/react'
import CampaignForm from '../components/CampaignForm'


const Generate = () => {


    return (
        <Box 
            display='flex'
            alignItems='center'
            justifyContent='center'
            height='100vh'
            mt='5'
        >
            <Box
                borderRadius='15px'      
                w='55%' 
                bg='gray.800'
                minWidth='350px'
                minHeight='420px'
                boxShadow='dark-lg'
            >
                <Heading as='h4' color='white' textAlign='center' mt='4'>
                    Generate a Link
                </Heading>

                {/* FORM COMPONENTS */}

                <Box display='flex' alignItems='center' justifyContent='center' mb='2%'>
                    <CampaignForm />
                </Box> 
            </Box>
        </Box>
    )
}

export default Generate