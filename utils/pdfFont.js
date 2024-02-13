import { Font } from '@react-pdf/renderer';

// Register Montserrat font for PDF generation
Font.register({
    family: 'Montserrat',
    src: '../public/fonts/Montserrat.ttf', 
});
