import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue
} from "@chakra-ui/react";

import NextLink from 'next/link';
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { FiRefreshCcw } from "react-icons/fi";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { GetServerSideProps } from "next";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export default function UserList({ users, totalCount }: { users: User[]; totalCount: number }) {
  const [ page, setPage ] = useState(1);
  const { data, isLoading, isFetching, refetch, error } = useUsers(page, {
    users,
    totalCount
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  async function handlePrefetchUser(userId: number) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`);

      return response.data;
    }, {
      staleTime: 1000 * 60 * 10
    });
  };

  return (
    <Box>
      <Header />

      <Flex
        w='100%'
        maxW={1480}
        mx='auto'
        px={['4','6']}
      >
        <Sidebar />

        <Box
          flex='1'
          borderRadius={8}
          bg='gray.800'
          p='8'
        >
          <Flex
            mb='8'
            justify='space-between'
            align='center'
          >
            <Heading
              size='lg'
              fontWeight='normal'
            >
              Usuários
              { !isLoading && isFetching && (
                <Spinner
                  size="sm"
                  color="gray.500"
                  ml="4"
                />
              ) }
            </Heading>

            <HStack>
              <Button
                as='a'
                size='sm'
                fontSize='sm'
                colorScheme='messenger'
                cursor='pointer'
                onClick={() => refetch()}
              >
                <FiRefreshCcw />
              </Button>

              <NextLink href='/users/create' passHref>
                <Button
                  as='a'
                  size='sm'
                  fontSize='sm'
                  colorScheme='pink'
                  leftIcon={<Icon
                    as={RiAddLine}
                    fontSize='20'
                  />}
                >
                  Criar novo
                </Button>
              </NextLink>
            </HStack>

          </Flex>

          { isLoading ? (
            <Flex
              justify='center'
            >
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex
              justify='center'
            >
              <Text>Falha ao obter dados dos usuários</Text>
            </Flex>
          ) : (
            <>
              <Table
                colorScheme='whiteAlpha'
              >
                <Thead>
                  <Tr>
                    <Th
                      px={['4', '4', '6']}
                      color='gray.300'
                      w='8'
                    >
                      <Checkbox
                        colorScheme='pink'
                      />
                    </Th>
                    <Th>
                      Usuário
                    </Th>
                    { isWideVersion && <Th>Data de cadastro</Th> }
                    { isWideVersion && <Th w='8' /> }
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map((user) => {
                    return (
                      <Tr key={user.id}>
                        <Td
                          px={['4', '4', '6']}
                        >
                          <Checkbox
                            colorScheme='pink'
                          />
                        </Td>
                        <Td>
                          <Box>
                            <Link color='purple.400' onMouseEnter={() => handlePrefetchUser(Number(user.id))}>
                              <Text
                                fontWeight='bold'
                              >
                                {user.name}
                              </Text>
                            </Link>
                            <Text
                              fontSize='small'
                              color='gray.300'
                            >
                              {user.email}
                            </Text>
                          </Box>
                        </Td>
                        { isWideVersion && <Td>{user.createdAt}</Td> }
                        { isWideVersion && (
                          <Td>
                            <Button
                              as='a'
                              size='sm'
                              fontSize='sm'
                              colorScheme='purple'
                              leftIcon={<Icon
                                as={RiPencilLine}
                              />}
                            >
                              Editar
                            </Button>
                          </Td>
                        ) }
                      </Tr>
                    )
                  })}
                </Tbody>
              </Table>
              <Pagination 
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { users, totalCount } = await getUsers(1);

  return {
    props: {
      users,
      totalCount
    }
  };
};