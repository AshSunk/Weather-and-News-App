import { Card, CardContent, CardMedia, Typography, Link } from '@mui/material';

export default function NewsCard({ article }) {
  const imageUrl = article.multimedia?.length > 0 ? article.multimedia[0].url : '';

  return (
    <Card sx={{ mb: 3 }}>
      {imageUrl && (
        <CardMedia
          component="img"
          height="200"
          image={imageUrl}
          alt={article.title}
        />
      )}
      <CardContent>
        <Typography variant="h6" gutterBottom>
          <Link href={article.url} target="_blank" rel="noopener noreferrer" underline="hover">
            {article.title}
          </Link>
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          {article.byline}
        </Typography>
        <Typography variant="body2">
          {article.abstract}
        </Typography>
      </CardContent>
    </Card>
  );
}