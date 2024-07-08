# Baduk Club DB

Baduk Club's ratings DB.

## Dev

### Deployment

Besides pushing things to Vercel and setting up the environment variables, you will need to manually do:

```sh
pnpm run db:push
```

You can use `pnpm run db:studio` to have a nice UI to the DB locally.

### Env

Locally, you can set things up with:

```env
#-----------------------------------------------------------
# 1. DB

NODE_ENV=
DATABASE_URL=

#-----------------------------------------------------------
```

## References

- [Baduk Club](https://baduk.club)
- [AGAGD on Github](https://github.com/usgo/agagd/tree/main)
- [AGA Ratings Program](https://github.com/Fraze/AGA-Ratings-Program/)
- [EGF's EGD References](https://www.europeangodatabase.eu/EGD/EGF_rating_system.php#ReferencejGs)
- Others
  - [dreamingsuntide - Are Elo Systems Overrated? Everything you wanted to know about Rating Systems](https://youtu.be/BT1mmikRils)
  - [GDC - Ranking Systems: Elo, TrueSkill and Your Own](https://youtu.be/VnOVLBbYlU0)
  - [GDC - Skill, Matchmaking, and Ranking Systems Design](https://youtu.be/-pglxege-gU)
