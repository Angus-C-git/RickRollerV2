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
    toast,
    useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { BsFillLightningChargeFill } from 'react-icons/bs'
import axios from 'axios'
import YouTube from 'react-youtube'
import Nav from '../../components/Nav'
import { API_BASE } from '../../utils/constants'


interface LinkInfo {
    rank: number;
    tags: string[];
    msg: string;
}


interface PlayerVars {
  autoplay?: 0 | 1;
  cc_load_policy?: 1;
  color?: 'red' | 'white';
  controls?: 0 | 1 | 2;
  disablekb?: 0 | 1;
  enablejsapi?: 0 | 1;
  end?: number;
  fs?: 0 | 1;
  hl?: string;
  iv_load_policy?: 1 | 3;
  list?: string;
  listType?: 'playlist' | 'search' | 'user_uploads';
  loop?: 0 | 1;
  modestbranding?: 1;
  origin?: string;
  playlist?: string;
  playsinline?: 0 | 1;
  rel?: 0 | 1;
  showinfo?: 0 | 1;
  start?: number;
  mute?: 0 | 1;
}

export interface Options {
  height?: string;
  width?: string;
  host?: string;
  playerVars?: PlayerVars;
}

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
export default function Rolled({ roller, linkID }): React.ReactElement {
    const avatarEndpoint = 'https://avatars.dicebear.com/api/initials/'
    const toast = useToast()

    const [ hasLoaded, setHasLoaded ] = useState(false)
    const [ failedLookup, setFailedLookup ] = useState(false)

    // fetched states
    const [ rank, setRank ] = useState(0)
    const [ rollerTags, setRollerTags ] = useState([])
    const [ rollerMsg, setRollerMsg ] = useState('')

    /** YouTube player options */
    const opts: Options = {
        playerVars: {
            autoplay: 1,
            controls: 0,
            showinfo: 0,
            modestbranding: 1,
            mute: 0
        }
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
    useEffect(() => {
        setHasLoaded(false)
        if (linkID)
            axios.get(`${API_BASE}/details/${linkID}`)
                .then(res => {
                    const { rank, tags, msg }: any = res.data
                    setRank(rank)
                    setRollerTags(tags)
                    setRollerMsg(msg)
                    setHasLoaded(true)
                }).catch(err => {
                    console.log('[>>] tampering detected', err)
                    toast({
                        title: 'Service Error',
                        description: 'Tampering or service error ;)',
                        status: 'error',
                        position: 'bottom-left',
                        duration: 1000,
                    })
                })
    }, [linkID, toast])
    

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
                                        You&apos;ve been rickrolled by {roller}!
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



export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true
    }
}

export async function getStaticProps({ params }) {
    // console.log("PARAMS ::", params)
    return { 
        props: {
            roller: params.roller[0],
            linkID: params.roller[1]
        } 
    }
}