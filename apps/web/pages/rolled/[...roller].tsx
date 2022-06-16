import { 
    Box, 
    ChakraProvider, 
    AspectRatio,
    Center,
    Flex,
    Avatar,
    Text,
    Badge,
    VStack,
    Icon,
    Fade,
    Collapse,
    Spinner,
    SkeletonCircle,
    SkeletonText,
    Alert,
    AlertTitle,
    AlertIcon,
    CloseButton,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import get from 'axios'
import YouTube from 'react-youtube'
import Nav from '../../components/Nav'

/**
 * Renders the page a victim will see
 * when they click on a link generated
 * by the platform. 
 * 
 * @returns {React.ReactElement}
 * 
 * @todo
 *  - test getting props server side for username
 */
export default function Rolled(): React.ReactElement {
    const avatarEndpoint = 'https://avatars.dicebear.com/api/initials/'
    const API_BASE = 'http://localhost:3000/roll'
    const { isReady, query } = useRouter()
    const [ roller, setRoller ] = useState('')
    const [ hasLoaded, setHasLoaded ] = useState(false)
    const [ failedLookup, setFailedLookup ] = useState(false)

    // fetched states
    const [ rank, setRank ] = useState(0)
    const [ rollerTags, setRollerTags ] = useState([])
    const [ rollerMsg, setRollerMsg ] = useState('')

    /** YouTube player options */
    const opts = {
        playerVars: {
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            mute: 0
        },
    }

    const onReady = (event) => {
        /** 
         * wait x seconds then unmute in an
         * attempt to trick browser blocking 
         * of auto played unmuted vids 
         * */
        setTimeout(() => {
            // event.target.unMute()
            event.target.playVideo()
        }, 2000)
    }

    /** Make follow up call to API to retrieve quick 
     * stats 
     * 
     * @NOTE urls are expected to be in the format of:
     *     
     *     - /rolled/<username>/<linkID>
     * 
     *      and are thus deciphered using array 
     *      indexing
     * 
     *     - [0] = username
     *     - [1] = linkID    
    */
    const fetchLinkDetails = async (linkID: string) => {
        if (!linkID) return
        
        console.log('[>>] fetching link details', linkID)

        try {
            const response: any = await get(`${API_BASE}/details/${linkID}`)
        
            if (!response.data) {
                console.log('[!!] no response from API')
                setFailedLookup(true)
                return
            }
            
            const { rank, tags, msg } = response.data
            console.log(`[<<] fetched link details, response: ${rank}, ${tags}, ${msg}`)

            setRank(rank)
            setRollerTags(tags)
            setRollerMsg(msg)

            setHasLoaded(true)
        } catch (error) {
            console.log('[!!] error fetching link details', error)
            setFailedLookup(true)
        }
    }

    useEffect(() => {
        // check query is ready
        if (isReady) {
            setRoller(query.roller[0])
            fetchLinkDetails(query.roller[1])
        }
    }, [isReady])

    return (
        <ChakraProvider>
            <Box bg='gray.700'>
                
                <Nav />

                {/*  Roller info HUD/badge */}
                <Center mt={10}>
                    <VStack spacing={5}>
                        {/* THREE JS Rick Astley */}
                        <Box>
                            {/** @TODO */}
                        </Box>
                        
                        {/* Heading/Intro */}
                       <Flex >
                           <Center 
                                bg='gray.600' 
                                pt={3} pb={3}
                                ml={2} mr={2} 
                                borderRadius={10}
                                boxShadow='dark-lg'
                            >
                                <Box pl={{ lg: 75, base: 8 }} pr={{lg: 75, base: 8 }}>
                                    <Text fontSize='2xl' color='white'>
                                        You've been rickrolled by {roller}!
                                    </Text>
                                </Box>
                            </Center>
                        </Flex>
                        
                        <Box>
                            {/* Roller Profile */}
                           
                            <Flex mb={4} >
                                <SkeletonCircle size='45' isLoaded={hasLoaded}>
                                    <Avatar src={`${avatarEndpoint}:${roller}.svg`} boxShadow='dark-lg' />
                                </SkeletonCircle>
                                
                                    <Box ml='3' minW={280}>
                                        <SkeletonText noOfLines={2} isLoaded={hasLoaded} height='20px'>
                                            <Text fontWeight='bold' color='white'>
                                                { roller }
                                            
                                                {hasLoaded && 
                                                    rollerTags.map((tag, index) => {
                                                        return (
                                                            <Badge key={index} ml='1' colorScheme={tag.color}>
                                                                { tag.name }
                                                            </Badge>
                                                        )
                                                    })   
                                                }
                                            </Text>
                                            <Fade in={hasLoaded}>
                                                <Text fontSize='md' color='white'>
                                                    Rank <></>
                                                    <Icon as={BsFillLightningChargeFill} /> 
                                                    { rank }
                                                </Text>
                                            </Fade>
                                        </SkeletonText>
                                    </Box>
                            </Flex>
                            
                            {/* Display optional msg */}
                            {rollerMsg && 
                                <Box ml={2}>
                                    <Collapse in={hasLoaded}>
                                        <Box 
                                            bg='gray.800' 
                                            borderRadius={25} 
                                            p={2} 
                                            mb={2} 
                                            width={4}
                                            boxShadow='dark-lg' 
                                        />
                                    </Collapse>
                                    <Collapse in={hasLoaded}>
                                        <Box 
                                            bg='gray.800' 
                                            borderRadius={25} 
                                            p={2} 
                                            mb={2} 
                                            width={95}
                                            boxShadow='dark-lg'
                                        />
                                    </Collapse>
                                    {/* MSG Box */}
                                    <Collapse in={hasLoaded}>
                                        <Box 
                                            bg='gray.800' 
                                            borderRadius={5} 
                                            p={10} 
                                            maxWidth={350}
                                            boxShadow='dark-lg'
                                            borderLeft='2px solid white'
                                        >
                                            <Text as ='i' fontSize='lg' color='white'>
                                                { rollerMsg }
                                            </Text>
                                        </Box>
                                    </Collapse>
                                </Box>
                            }
                        </Box>
                    </VStack>
                   
                </Center>

                {/* VIDEO AUTOPLAYER */}
                <Box display='flex' justifyContent='center'>
                    <Box
                        position='absolute'
                        top='50px'
                        left='0px'
                        bottom='0px'
                        height='80%'
                        width='100%'
                        zIndex={5}
                    >

                    </Box>
                </Box>

                
                <Center mt={30}>
                    <AspectRatio maxW='550' ratio={1} minW='450'>
                        <YouTube 
                            videoId='dQw4w9WgXcQ'
                            opts={opts}
                            onReady={onReady}
                        />
                    </AspectRatio>
                </Center>

                { failedLookup &&
                    // display bottom left alert 
                    <Box w={300} ml={5} position='fixed' bottom='5'>
                        <Alert status='error'>
                            <AlertIcon />
                            <AlertTitle mr={2}>
                                Failed to load roller details
                            </AlertTitle>
                            <CloseButton 
                                position='absolute' 
                                right='8px' 
                                top='8px' 
                                onClick={() => setFailedLookup(false)}
                            />
                        </Alert>
                    </Box>
                }
            </Box>
        </ChakraProvider>
    )    
}
