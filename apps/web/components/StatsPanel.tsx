import { 
    Box,
    Heading,
    VStack,
    Stat,
    StatHelpText,
    StatNumber,
    StatArrow,
    Flex,
    Spacer,
    Icon
} from '@chakra-ui/react'
import { useState } from 'react'
import { BsFillLightningChargeFill } from 'react-icons/bs'

interface StatsPanelProps {
    generated: number
    generatedIncrease: number
    clicked: number
    clickedIncrease: number
    rank: number
    rankIncrease: number
    campaignCount: number
    campaignsSince: string
}

const getCurrentDate = () => {
    const now = new Date()
    const day = (now.getDay() < 10) ? `0${now.getDay()}` : now.getDay()  
    return `${now.toLocaleString('default', {month: 'short'})} ${day}`
}

const StatsPanel = ({
    generated,
    generatedIncrease,
    clicked,
    clickedIncrease,
    rank,
    rankIncrease,
    campaignCount,
    campaignsSince
}: StatsPanelProps) => {

    return (
        <Box>
            <VStack spacing={5} align='stretch'>
                <Box bg='gray.800' minHeight='190px' borderRadius='15px' boxShadow='dark-lg'>
                    <Flex m='5'>       
                        <Box>
                            <Stat color='white'>
                                <Heading as='h4' size='md' color='white' pt='2' mb='6'>
                                    Generated
                                </Heading>
                                <StatNumber>{generated}</StatNumber>
                                <StatHelpText>
                                    <StatArrow type='increase' />
                                    {generatedIncrease}%
                                </StatHelpText>
                            </Stat>
                        </Box>
                        <Spacer />
                        <Box>
                            <Stat color='white'>
                                <Heading as='h4' size='md' color='white' pt='2' mb='6'>
                                    Clicked
                                </Heading>
                                <StatNumber>{clicked}</StatNumber>
                                <StatHelpText>
                                <StatArrow type='decrease' />
                                    {clickedIncrease}%
                                </StatHelpText>
                            </Stat>
                        </Box>
                    </Flex>
                </Box>

                <Box bg='gray.800' minHeight='190px' borderRadius='15px' boxShadow='dark-lg'>
                    <Flex m='5'>       
                        <Box>
                            <Stat color='white'>
                                <Heading as='h4' size='md' color='white' pt='2' mb='6'>
                                    Campaigns
                                </Heading>
                                <StatNumber>#{campaignCount}</StatNumber>
                                {/* TODO: date range start */}
                                <StatHelpText>
                                    {campaignsSince} 02 - {getCurrentDate()} 
                                </StatHelpText>
                            </Stat>
                        </Box>
                        <Spacer />
                        <Box>
                            <Stat color='white'>
                                <Heading as='h4' size='md' color='white' pt='2' mb='6'>
                                    Rank
                                </Heading>
                                <StatNumber>
                                    <Icon as={BsFillLightningChargeFill} w='5' h='5'/>{rank}
                                </StatNumber>
                                <StatHelpText>
                                <StatArrow type='increase' />
                                    {rankIncrease}%
                                </StatHelpText>
                            </Stat>
                        </Box>
                    </Flex>
                </Box>
            </VStack>
        </Box>
    )
}

export default StatsPanel