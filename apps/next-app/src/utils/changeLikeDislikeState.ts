export type LikeDislikeState = 'liked' | 'disliked' | 'none';

export interface ChangeLikeDislikeStateProps {
  likes: number,
  dislikes: number,
  prevState: LikeDislikeState,
  nextState: LikeDislikeState;
}

export function changeLikeDislikeState({
  prevState,
  nextState,
  dislikes,
  likes
}: ChangeLikeDislikeStateProps) {
  function disliked() {
    if(nextState === 'liked') {
      dislikes -= 1;
      likes += 1;
    }

    if(nextState === 'none') {
      dislikes -= 1;
    }
  }

  function liked() {
    if(nextState === 'disliked') {
      likes -= 1;
      dislikes += 1;
    }

    if(nextState === 'none') {
      likes -= 1;
    }
  }

  function none() {
    if(nextState === 'liked') {
      likes += 1;
    }

    if(nextState === 'disliked') {
      dislikes += 1;
    }
  }

  const cases = {
    disliked,
    liked,
    none,
  };

  const result = cases[prevState];
  
  result();

  return {
    likes,
    dislikes,
    prevState,
    nextState,
  };
}