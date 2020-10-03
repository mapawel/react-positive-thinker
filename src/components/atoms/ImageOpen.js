import React from 'react';
import { Grid, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'material-ui-image';

const useStyles = makeStyles({
    backDropBox: {
        position: 'fixed',
        zIndex: '9999',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
    },
    insideBox: {
        height: '90vh',
        position: 'relative',
    },

});


const ImageOpen = ({ openImageUrl, handleClickImageClose }) => {
    const classes = useStyles();
    return (
        <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.backDropBox}
        onClick={handleClickImageClose}
        >
            <Grid item xs={12} md={10} lg={6} className={classes.insideBox}>
            <Backdrop open={true} />
                <Image
                    src={openImageUrl}
                    color="transparent"
                    imageStyle={{backgroundColor: 'transparent', width: 'auto', height: 'auto', maxHeight: '100%', maxWidth: '100%', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',}}
                    style={{height: '100%', width: '100%', paddingTop: '0'}}
                />
            </Grid>
        </Grid>
    );
};

export default ImageOpen;
