import React from 'react'
import { Page, Text, View, StyleSheet, Image, Svg, Path, Rect, Font } from '@react-pdf/renderer';

Font.register({

    family: 'Antonio 700',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Antonio-Bold.ttf`,
});
Font.register({

    family: 'Antonio 600',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Antonio-SemiBold.ttf`,
});
Font.register({

    family: 'Antonio 500',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Antonio-Medium.ttf`,
});
Font.register({

    family: 'Antonio 400',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Antonio-Regular.ttf`,
});
Font.register({

    family: 'Antonio 300',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Antonio-Thin.ttf`,
});
Font.register({

    family: 'Roboto 700',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Roboto-Bold.ttf`,
});
Font.register({

    family: 'Roboto 600',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Roboto-Bold.ttf`,
});
Font.register({

    family: 'Roboto 500',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Roboto-Medium.ttf`,
});
Font.register({

    family: 'Roboto 400',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Roboto-Regular.ttf`,
});
Font.register({

    family: 'Roboto 300',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Roboto-Thin.ttf`,
});

Font.register({

    family: 'Barlow 700',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Barlow-Bold.ttf`,
});

Font.register({

    family: 'Barlow 600',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Barlow-SemiBold.ttf`,
});

Font.register({

    family: 'Barlow 500',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Barlow-Medium.ttf`,
});

Font.register({

    family: 'Barlow 400',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Barlow-Regular.ttf`,
});
Font.register({

    family: 'Barlow 300',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Barlow-Thin.ttf`,
});
Font.register({

    family: 'Barlow Italic 500',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Barlow-MediumItalic.ttf`,
});
Font.register({

    family: 'Barlow Condensed 700',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/BarlowCondensed-Bold.ttf`,
});
Font.register({

    family: 'Barlow Condensed 600',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/BarlowCondensed-SemiBold.ttf`,
});
Font.register({

    family: 'Barlow Condensed 500',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Barlow-Regular.ttf`,
});

Font.register({

    family: 'Barlow Condensed 400',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/BarlowCondensed-Medium.ttf`,
});

Font.register({

    family: 'Barlow Condensed 300',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/BarlowCondensed-Thin.ttf`,
});
Font.register({

    family: 'Gothic 400',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/GOTHIC.TTF`,
});

Font.register({

    family: 'Inter 700',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Inter-Bold.ttf`,
});
Font.register({

    family: 'Inter 600',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Inter-SemiBold.ttf`,
});

Font.register({

    family: 'Inter 500',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Inter-Medium.ttf`,
});

Font.register({

    family: 'Inter 400',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Inter-Regular.ttf`,
});

Font.register({

    family: 'Inter 300',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Inter-Thin.ttf`,
});
Font.register({

    family: 'Kanit 700',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Kanit-Bold.ttf`,
});

Font.register({

    family: 'Kanit 600',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Kanit-SemiBold.ttf`,
});

Font.register({

    family: 'Kanit 500',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Kanit-Medium.ttf`,
});

Font.register({

    family: 'Kanit 400',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Kanit-Regular.ttf`,
});
Font.register({

    family: 'Kanit 300',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Kanit-Thin.ttf`,
});
Font.register({

    family: 'Montserrat 700',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Montserrat-Bold.ttf`,
});
Font.register({

    family: 'Montserrat 600',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Montserrat-SemiBold.ttf`,
});
Font.register({

    family: 'Montserrat 500',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Montserrat-Medium.ttf`,
});
Font.register({

    family: 'Montserrat 400',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Montserrat-Regular.ttf`,
});
Font.register({

    family: 'Montserrat 300',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Montserrat-Thin.ttf`,
});

Font.register({

    family: 'Outfit 700',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Outfit-Bold.ttf`,
});
Font.register({

    family: 'Outfit 600',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Outfit-SemiBold.ttf`,
});
Font.register({

    family: 'Outfit 500',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Outfit-Medium.ttf`,
});
Font.register({

    family: 'Outfit 400',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Outfit-Regular.ttf`,
});
Font.register({

    family: 'Outfit 300',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Outfit-Thin.ttf`,
});







Font.register({

    family: 'Open Sans',
    src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
});

Font.register({
    family: 'Lato 400',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Lato-Regular.ttf`,
});

Font.register({
    family: 'Lato Italic',
    src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
});

Font.register({
    family: 'Lato 700',
    src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
});

Font.register({
    family: 'Lato 600',
    src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
});
Font.register({
    family: 'Lato 500',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Lato-Regular.ttf`,
});
Font.register({
    family: 'Lato 300',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Lato-Thin.ttf`,
});



Font.register({
    family: 'Poppins 700',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Poppins-Bold.ttf`,
   
});
Font.register({
    family: 'Poppins 600',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Poppins-SemiBold.ttf`,
   
});
Font.register({
    family: 'Poppins 500',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Poppins-Medium.ttf`,
  
});
Font.register({
    family: 'Poppins 400',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Poppins-Regular.ttf`,
   
});
Font.register({
    family: 'Poppins 300',
    src: `https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/fonts/Poppins-Thin.ttf`,
   
});





function Fonts() {
    return (
        <></>
    )
}

export default Fonts

