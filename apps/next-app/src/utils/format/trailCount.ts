export interface TrailCountProps {
  _count: {
    playlists: number;
    lessons: number;
    users: number;
  }
}

export function trailCount(trail?: TrailCountProps) {
  const playlistCount = trail?._count.playlists
  const playlistCountText = playlistCount === 1 ? `${playlistCount} playlist` : `${playlistCount} playlists`;

  const lessonsCount = trail?._count.lessons;
  const lessonsCountText = lessonsCount === 1 ? `${lessonsCount} aula` : `${lessonsCount} aulas`;

  const usersCount = trail?._count.users;
  const usersCountText = usersCount === 1 ? `${usersCount} aluno` : `${usersCount} alunos`;

  return {
    lessons: lessonsCountText,
    playlists: playlistCountText,
    users: usersCountText,
  };
}