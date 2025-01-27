import React, { useEffect, useState } from 'react'
import { Typography, Button, Box, Card, CardActions, CardContent } from "@mui/material"
import './DeletarProdutos.css';
import { useNavigate, useParams } from 'react-router-dom';
import Produto from '../../../models/Produto';
import { buscaId, deleteId } from '../../../services/Service';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReduce';


function DeletarProdutos() {

    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); 
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    const [post, setPosts] = useState<Produto>();

    useEffect(() => {
        if (token == "") {
            toast.info("Você precisa estar logado!", {
                position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover:false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
            });
            navigate("/login");
        }
    }, [token]);

    useEffect(() => {
        if (id != undefined) {
            findById(id);
        }
    }, [id]);

    const findById = async (id: string) => {

        buscaId(`/produtos/${id}`, setPosts, {
            headers: {
                'Authorization': token
            }
        })
    };

    const sim = () => {
        navigate("/produtos");
        deleteId(`/produtos/${id}`, {
            headers: {
                'Authorization': token
            }
        });
        toast.success("Produto deletado com sucesso", {
            position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover:false,
                    draggable: false,
                    theme: "colored",
                    progress: undefined,
        });
    }
    const nao = () => {
        navigate("/produtos");
    }

    return (
        <>
            <Box m={2}>
                <Card variant="outlined" >
                    <CardContent>
                        <Box justifyContent="center">
                            <Typography color="textSecondary" gutterBottom>
                                Deseja deletar a Produto:
                            </Typography>
                            <Typography color="textSecondary" >
                                {post?.nome}
                            </Typography>
                        </Box>

                    </CardContent>
                    <CardActions>
                        <Box display="flex" justifyContent="start" ml={1.0} mb={2} >
                            <Box mx={2}>
                                <Button onClick={sim} variant="contained" className="marginLeft" size='large' color="primary">
                                    Sim
                                </Button>
                            </Box>
                            <Box>
                                <Button onClick={nao} variant="contained" size='large' color="secondary">
                                    Não
                                </Button>
                            </Box>
                        </Box>
                    </CardActions>
                </Card>
            </Box>
        </>
    );
}
export default DeletarProdutos