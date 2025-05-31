import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, CardActionArea, Grid, Tooltip, tooltipClasses, TooltipProps } from '@mui/material';
import { Content } from '@/utils/types';
import { format, parseISO } from 'date-fns';
import { truncateDescription } from '@/utils/helper'
import Link from 'next/link';

interface ContentCardProps {
  contents: Content[];
}

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: '100%',
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const ContentCard: React.FC<ContentCardProps> = ({ contents }) => {
  return (
    <Grid container spacing={3} sx={{my: 4}}>
      {contents.map((content) => (
      <Grid item lg={4} key={content.id}>
          <Link href={'/detail/' + content.display_url} style={{textDecoration: 'none'}}>
            <Card sx={{ maxWidth: '100%', height: '100%' }}>
            <CardActionArea>
                <CardHeader
                  avatar={
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Box sx={{display: 'flex', justifyContent: 'start', margin: 2}}>
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                              R
                            </Avatar>
                            <Box>
                              <Link href={content.brand.slug} style={{textDecoration: 'none'}}>
                                <Typography sx={{mx: 2}}>{content?.brand?.name}</Typography>
                              </Link>
                              <Typography sx={{mx: 2, fontSize: 13}}>{content?.brand?.founded == null ? 'Since unknown' : 'Since ' + content?.brand?.founed}</Typography>
                            </Box>
                          </Box>
                        </React.Fragment>
                      }
                    >
                      <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                      </Avatar>
                    </HtmlTooltip>
                  }
                  title={
                    <Tooltip title={content.title}>
                      <Typography style={{ lineHeight: 2, fontSize: 14}}>
                        {truncateDescription(content.title, 84)}
                      </Typography>
                    </Tooltip>
                  }
                  subheader={
                    <span style={{ marginTop: '8px', display: 'block' }}>
                      {format(parseISO(content.created_at), 'MMMM d, yyyy')}
                    </span>
                  }
                />
                <CardMedia
                  component="img"
                  height="194"
                  image="/images/paella.jpg"
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {truncateDescription(content.description, 170)}
                  </Typography>
                </CardContent>
                </CardActionArea>
                <CardActions disableSpacing>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </CardActions>
            </Card>
          </Link>
      </Grid>
      ))}
    </Grid>
   
  );
}


export default ContentCard;
