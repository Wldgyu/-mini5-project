import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import {useNavigate} from "react-router-dom";

export default function BookCard(props) {
    console.log(props);
    const {id, title, img} = props;

    return (
        <Card sx={{maxWidth: 345}} onClick={() => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useNavigate(`/detail/${id}`)
        }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={img}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" sx={{color: 'text.secondary'}}>
                        {"내용"}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}