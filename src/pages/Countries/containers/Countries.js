import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import countriesActions from '../actions/countries'
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

function Countries() {
    const navigate = useNavigate();
    const countries = useSelector(({countries}) => countries);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(countriesActions.fetchCountries())
        // eslint-disable-next-line
    }, []);

    const deleteCountry = (e) => {
        const id = e.currentTarget.id;
        if (window.confirm("Are you really want to delete an item?")) {
            fetch("http://localhost:8080/country/delete/" + id, {method: 'DELETE'})
                .then(() => {
                    dispatch(countriesActions.fetchCountries())
                })
        }
    }

    const handleOnClick = (e) => {
        const id = e.currentTarget.id;
        navigate('/addEditCountry/' + id);
    }

    return (
        <div>
            <br/>
            {countries.isLoading && (
                <div>
                    <CircularProgress/>
                </div>
            )}
            {!countries.isLoading && (
                <div>
                    <br/>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Continent</TableCell>
                                    <TableCell align="right">Area</TableCell>
                                    <TableCell align="right">Edit</TableCell>
                                    <TableCell align="right">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {countries.list.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.continent}</TableCell>
                                        <TableCell align="right">{row.area}</TableCell>
                                        <TableCell align="right">
                                            <Button variant="outlined" id={row.id}
                                                    onClick={handleOnClick}>Edit</Button>
                                        </TableCell>
                                        <TableCell align="right"><Button variant="outlined" id={row.id} color="error"
                                                                         onClick={deleteCountry}>Delete</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>


                </div>
            )}
        </div>
    )
}

export default Countries;