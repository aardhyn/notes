#!/bin/bash
if [ ! -f .env ]; then
  echo Please create a .env file from the .env.template
  exit 1
fi

source .env

if [ -z $VITE_PROJECT_REF ]; then
  echo Please set the VITE_PROJECT_REF variable in .env
  exit 1;
fi

schema=public
dest=src/api/types.generated.ts
errDest=.generateTypes.errors

npx supabase login
npx supabase gen types typescript --project-id $VITE_PROJECT_REF --schema $schema 1> $dest 2> $errDest

echo Generated types stored in $dest
exit 0;
