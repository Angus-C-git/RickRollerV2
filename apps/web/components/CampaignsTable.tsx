import { 
    Box, 
    Heading, 
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Center,
} from '@chakra-ui/react'

interface CampaignsTableProps {
    campaigns: Array<{
        name: string
        started: string
        clicks: number
    }>
}

const CampaignsTable = ({ campaigns }: CampaignsTableProps) => {
    return (
        <Box bg='gray.800' minHeight='400px' borderRadius='15px' boxShadow='dark-lg'>
            <Heading as='h4' size='lg' color='white' ml='5' pt='2'>
                Campaigns
            </Heading>
            {campaigns.length >  0 ? 
                (
                    <Box maxHeight='350px' overflowY='scroll'>
                        <Table variant='simple' colorScheme='whiteAlpha' w='90%' m='5'>
                            <Thead>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Started</Th>
                                    <Th isNumeric>Total</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {campaigns.map(({ name, started, clicks }) => (
                                    <Tr key={name} color='white'>
                                        <Td>{name}</Td>
                                        <Td>{started}</Td>
                                        <Td isNumeric>{clicks}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                ): (
                    <Center>
                        <Heading as='h1' size='xl' color='gray.300' mt='150px'>
                            No Campaigns Yet
                        </Heading>       
                    </Center>
                )
            }

        </Box>

    )
}

export default CampaignsTable