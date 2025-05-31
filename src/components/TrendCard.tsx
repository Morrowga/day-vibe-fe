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
import { Content, Trend } from '@/utils/types';
import { format, parseISO } from 'date-fns';
import { truncateDescription } from '@/utils/helper'
import Link from 'next/link';

interface TrendCardProps {
  trends: Trend[];
}

const fireBorder = `
@keyframes flame {
  0% { border-color: rgba(255, 69, 0, 1); }
  50% { border-color: rgba(255, 140, 0, 1); }
  100% { border-color: rgba(255, 69, 0, 1); }
}

.fire-border {
  border: 4px solid;
  border-radius: 8px;
  animation: flame 1s infinite;
}
`;

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

const TrendCard: React.FC<TrendCardProps> = ({ trends = [] }) => {
  return (
    <Grid container spacing={3}>
      {trends.map((trend) => (
      <Grid item lg={4} key={trend.id}>
          <Link href={'/detail/' + trend.content.display_url} style={{textDecoration: 'none'}}>
            <Card className="fire-border" 
              sx={{
                maxWidth: '100%',
                height: '100%',
                position: 'relative',
                border: '4px solid transparent',  // Ensure border is visible
              }}>
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
                              <Link href={trend.content?.brand?.slug} style={{textDecoration: 'none'}}>
                                <Typography sx={{mx: 2}}>{trend?.content?.brand?.name}</Typography>
                              </Link>
                              <Typography sx={{mx: 2, fontSize: 13}}>{trend?.content?.brand?.founded == null ? 'Since unknown' : 'Since ' + trend.content?.brand?.founed}</Typography>
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
                    <Tooltip title={trend?.content.title}>
                    <Typography style={{ lineHeight: 2, fontSize: 14}}>
                        {truncateDescription(trend?.content.title, 85)}
                    </Typography>
                    </Tooltip>
                  }
                  subheader={
                    <span style={{ marginTop: '5px', display: 'block' }}>
                      {format(parseISO(trend?.content.created_at), 'MMMM d, yyyy')}
                    </span>
                  }
                />
                <CardMedia
                  component="img"
                  height="194"
                  image="/images/paella.jpg"
                  alt="Paella dish"
                />
                </CardActionArea>
            </Card>
          </Link>
      </Grid>
      ))}
    </Grid>
   
  );
}


export default TrendCard;
