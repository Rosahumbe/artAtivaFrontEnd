import * as React from 'react'
import { Link } from 'react-router-dom'
import { Box, Card, CardActions, CardContent, Button, Typography } from '@material-ui/core';
import './ListaTema.css'; 
import Categoria from '../../../model/Categoria';
import { useNavigate } from 'react-router-dom';
import { busca } from '../../../services/Service';
import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';

function ListaTema() {

  const [categorias, setCategorias] = React.useState<Categoria[]>([]);
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  let navigate = useNavigate();

  React.useEffect(() => {
    if(token == ''){
      alert("Você precisa estar logado para acessar essa página");
      navigate('/login');
    }
  }, [token]);
 
  const getTemas = async () => {
    //adicionar try catch
    await busca("/tema", setCategorias, {
    headers: {
      'Authorization':  token
    }
  });
  }

  React.useEffect(() => {
    getTemas();
  } , [categorias.length]);



  return (
    <>
    <Grid container spacing={3} className='container-tema'> 
    {
      categorias.map(categoria => (
      <Box className='box-tema' m={2} > 
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">
              {categoria.categoria}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {categoria.descricao}
            </Typography>
          </CardContent>
          <CardActions>
            <Box className='box-tema-botoes' mb={1.5} >
              <Link to={`/formularioTema/${categoria.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" className="botao-tema botao-atualizar" size='small' color="primary" >
                    atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deletarTema/${categoria.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" className="botao-tema " size='small' color="secondary">
                    deletar
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>
        </Card>
      </Box>
      ))
      }
    </Grid> 
    </>
  );
}


export default ListaTema;