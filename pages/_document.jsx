import Document, { Html, Head, Main, NextScript } from "next/document";
import { Font } from '@react-pdf/renderer';
export default class MyDocument extends Document {
    render () {
        return (
            <Html lang="en">
                <Head>
                    <base href={ process.env.PUBLIC_URL } />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700%7CPoppins:300,400,500,600,700" />
                    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
                    <link rel="stylesheet" type="text/css" href="css/fonts-molla.min.css" />
                    <link rel="stylesheet" type="text/css" href="vendor/line-awesome/css/line-awesome.min.css" />
                   
                
                    <link href="https://fonts.googleapis.com/css2?family=Antonio:wght@100..700&family=Barlow:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@100..900&family=Kanit:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Outfit:wght@100..900&display=swap" rel="stylesheet"/>
                </Head>
                <body>
                    <Main />
                    <script src="js/jquery.min.js"></script>
                    <NextScript />
                </body>
            </Html>
        )
    }
}
