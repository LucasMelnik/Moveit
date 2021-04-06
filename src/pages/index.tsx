import Head from 'next/head'
import { GetServerSideProps } from 'next'
import React from "react";
import { CompletedChanges } from "../components/CompletedChallenges";
import { CountDown } from "../components/CountDown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";

import styles from "../styles/pages/Home.module.css"
import { CountdownProvider } from '../contexts/ContdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps{
  level: number
  currentExperience: number
  challengesCompleted: number
}

export default function Home(props) {
  return (
    <ChallengesProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | Move.it</title>
        </Head>

        <ExperienceBar/>

        <CountdownProvider>
          <section>
            <div>
              <Profile/>
              <CompletedChanges />
              <CountDown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currentExperience, challengesCompleted } = ctx.req.cookies
  
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}
