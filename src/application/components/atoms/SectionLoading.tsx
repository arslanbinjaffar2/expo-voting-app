import React from 'react';
import { Spinner, HStack, Heading, Center } from 'native-base';

type Props = {
    h?: string
}

const SectionLoading = ({ h }: Props) => {
    return (
        <Center alignItems={'center'} justifyContent={'center'} w={'100%'}>
            <HStack space={3} alignItems="center" h={h ? h : '500px'}>
                <Spinner size={'sm'} color="black" accessibilityLabel="Loading posts" />
                <Heading color="primary.text" ml={1} fontSize="lg">
                    Loading
                </Heading>
            </HStack>
        </Center>
    )
}

export default SectionLoading