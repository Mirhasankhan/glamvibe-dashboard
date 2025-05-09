export const chartData = (monthWiseReviews: Record<string, { count: number, ratings: number[] }>) => {
    const chartData = Object.keys(monthWiseReviews).map((month) => {   
      const ratings = monthWiseReviews[month].ratings;  
    
      const positive = ratings.filter(rating => rating === 4 || rating === 5).length;
      const negative = ratings.filter(rating => rating === 1 || rating === 2 || rating === 3).length;  
   
      return {
        month,
        positive,
        negative
      };
    });
  
    return chartData;
  };