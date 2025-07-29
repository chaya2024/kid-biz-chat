interface FlowStep {
  sender: string;
  content: string;
  type: 'moderator' | 'kid';
  avatar: string;
  kidIndex?: number;
}

export const sessionScript = {
  introduction: `🏝️ Welcome young entrepreneurs! You've just crash-landed on a mysterious deserted island. Don't worry - this is going to be an amazing adventure where we'll learn about teamwork, problem-solving, and entrepreneurship!

Let's start by getting to know each other. I'm Captain AI, your adventure guide. Who wants to introduce themselves first? 🌴`,

  flow: [
    // Icebreaker Round
    {
      sender: "Emma",
      content: "Hi everyone! I'm Emma and I love building things! On this island, I think we should build a treehouse first. What do you all think? 🏗️",
      type: "kid",
      avatar: "👧",
      kidIndex: 0
    },
    {
      sender: "Jake",
      content: "Cool! I'm Jake and I'm really good at finding things. Maybe I can help us find food and water? I watch a lot of survival shows! 🔍",
      type: "kid",
      avatar: "👦",
      kidIndex: 1
    },
    {
      sender: "Sofia",
      content: "Hey! I'm Sofia and I love solving puzzles. This island is like a big puzzle we need to solve together! I think we need a plan. 🧩",
      type: "kid",
      avatar: "👧",
      kidIndex: 2
    },
    {
      sender: "Captain AI",
      content: "Fantastic introductions! I can already see great entrepreneurial thinking. Emma wants to build, Jake wants to explore, and Sofia wants to plan. These are all important business skills! Let's hear from everyone else. 🤖",
      type: "moderator",
      avatar: "🤖"
    },
    {
      sender: "Marcus",
      content: "I'm Marcus! I like organizing stuff and making lists. Should we make a list of everything we need to survive? Like shelter, food, water, fire? 📝",
      type: "kid",
      avatar: "👦",
      kidIndex: 3
    },
    {
      sender: "Lily",
      content: "Hi! I'm Lily and I'm really creative. Maybe we can make art and decorations to make our island camp beautiful? And signals to get rescued! 🎨",
      type: "kid",
      avatar: "👧",
      kidIndex: 4
    },
    {
      sender: "Alex",
      content: "Hey everyone! I'm Alex and I love sports. I think we need to stay strong and healthy on the island. Maybe we can organize fun games too! ⚽",
      type: "kid",
      avatar: "👦",
      kidIndex: 5
    },
    
    // Scenario Exploration
    {
      sender: "Captain AI",
      content: `Excellent! Now I can see we have a diverse team with amazing skills:
      
🏗️ Emma - Our builder and engineer
🔍 Jake - Our explorer and resource finder  
🧩 Sofia - Our strategic planner
📝 Marcus - Our organizer and list-maker
🎨 Lily - Our creative designer
⚽ Alex - Our fitness and fun coordinator

Now, let's explore our situation. Look around this virtual island! What do you think are the most important things we need to survive AND thrive here? 🏝️`,
      type: "moderator",
      avatar: "🤖"
    },
    
    // Open Discussion
    {
      sender: "Emma",
      content: "I think shelter is super important! We could build an awesome fort with bamboo and leaves. Maybe even multiple levels! 🏠",
      type: "kid",
      avatar: "👧",
      kidIndex: 0
    },
    {
      sender: "Jake",
      content: "And I found some coconut trees and a fresh water stream! Plus there might be fish in the lagoon. We won't go hungry! 🥥🐟",
      type: "kid",
      avatar: "👦",
      kidIndex: 1
    },
    {
      sender: "Sofia",
      content: "Those are great! But we also need to think long-term. What if we're here for weeks? We need systems for everything - like a daily schedule! ⏰",
      type: "kid",
      avatar: "👧",
      kidIndex: 2
    },
    {
      sender: "Captain AI",
      content: "I love how you're all thinking like real entrepreneurs! You're identifying needs (shelter, food, water), resources (bamboo, coconuts, stream), and systems (schedules, organization). What about getting rescued? Any ideas? 🚁",
      type: "moderator",
      avatar: "🤖"
    },
    {
      sender: "Lily",
      content: "We could make a huge SOS sign with rocks and shells! And maybe colorful flags that wave in the wind! Art that saves lives! 🚩",
      type: "kid",
      avatar: "👧",
      kidIndex: 4
    },
    {
      sender: "Marcus",
      content: "Good idea! I think we should divide into teams. Like Team Shelter, Team Food, Team Rescue Signal. Everyone does what they're best at! 👥",
      type: "kid",
      avatar: "👦",
      kidIndex: 3
    },
    {
      sender: "Alex",
      content: "And we need Team Fun! All work and no play isn't good. We could have island Olympics! Beach volleyball, swimming races! 🏆",
      type: "kid",
      avatar: "👦",
      kidIndex: 5
    },
    
    // Group Task - Action Plan
    {
      sender: "Captain AI",
      content: `Outstanding thinking, everyone! Now comes the real entrepreneurial challenge. As a team, you need to create a detailed action plan for your first week on the island.

Let's work together to create "Island Survivors Inc." - your very own survival company! Every great business needs a plan. 

What should be our top 3 priorities for Day 1? Talk it through as a team! 📋✨`,
      type: "moderator",
      avatar: "🤖"
    },
    {
      sender: "Sofia",
      content: "Okay team, let's think step by step! I think Day 1 priorities should be: 1) Find safe shelter 2) Secure fresh water 3) Make a rescue signal. What do you think? 🤔",
      type: "kid",
      avatar: "👧",
      kidIndex: 2
    },
    {
      sender: "Emma",
      content: "I agree! For shelter, we could start with a simple lean-to near the beach, then upgrade to the awesome treehouse later! 🏕️",
      type: "kid",
      avatar: "👧",
      kidIndex: 0
    },
    {
      sender: "Jake",
      content: "Perfect! I already spotted that freshwater stream. We just need to make containers from big leaves or coconut shells! 💧",
      type: "kid",
      avatar: "👦",
      kidIndex: 1
    },
    {
      sender: "Lily",
      content: "And I can start gathering colorful shells and rocks for our SOS sign! We should make it HUGE so planes can see it! ✈️",
      type: "kid",
      avatar: "👧",
      kidIndex: 4
    },
    {
      sender: "Marcus",
      content: "Great! So our Day 1 action plan: Morning - build basic shelter. Afternoon - set up water collection. Evening - start rescue signal. Everyone agree? ✅",
      type: "kid",
      avatar: "👦",
      kidIndex: 3
    },
    {
      sender: "Alex",
      content: "Sounds perfect! And we can make it fun - like a team-building challenge! The group that finishes their task first gets to pick tonight's dinner! 🍽️",
      type: "kid",
      avatar: "👦",
      kidIndex: 5
    },
    
    // Summary and Inspiration
    {
      sender: "Captain AI",
      content: `🌟 WOW! I'm incredibly impressed with your teamwork and entrepreneurial thinking! Let me summarize what "Island Survivors Inc." has accomplished:

✅ **Team Formation** - You identified everyone's unique strengths
✅ **Problem Analysis** - You broke down survival into manageable challenges  
✅ **Resource Mapping** - You found water, food sources, and building materials
✅ **Strategic Planning** - You created a clear Day 1 action plan
✅ **Team Organization** - You assigned roles based on individual strengths
✅ **Innovation** - You came up with creative solutions (art for rescue signals!)

These are exactly the skills that successful entrepreneurs use every day! 🚀`,
      type: "moderator",
      avatar: "🤖"
    },
    {
      sender: "Captain AI",
      content: `🎯 **Key Entrepreneurial Lessons Learned:**

🤝 **Teamwork** - Great businesses need diverse skills working together
🧠 **Problem-Solving** - Break big challenges into smaller, manageable tasks  
💡 **Innovation** - Creative thinking leads to better solutions
📊 **Planning** - Having a clear strategy helps teams succeed
🎯 **Execution** - Turning ideas into action is what makes businesses work

You've shown that even on a deserted island, with the right mindset and teamwork, you can overcome any challenge! That's the entrepreneurial spirit! 

Ready to take on the real world? 🌍✨`,
      type: "moderator",
      avatar: "🤖"
    }
  ] as FlowStep[]
};