export default {
	content: ["./src/**/*.tsx", "./src/**/*.css"],
	plugins: [require("@tailwindcss/forms")],
	theme:{
	  extend:{
		colors:{
		  primary:"#006C4A",
		  secondary:"#00B87E",
		  white:"#FFFFFF",
		  black:"#202224",
		  'light-white':"#F4F4F4",
		  gray:"#BBBBBB",
		  'input-fill':'#F1F4F9',
		  'input-border':'#D8D8D8',
		  'input-placeholder':'#A6A6A6',
		  blue:'#5A8CFF',
		  'dark-white':'#F5F6FA',
		  'border-gray':'#D5D5D5',
		  'dark-gray':'#404040',
		  'light-gray':'#565656',
		  'saturakte-white':'#F9F9FB',
		  'divider-gray':'#979797',
		  'red':'#EA0234',
		  'saturate-red':'#F93C65',
		  'saturate-green':'#00B69B',
		  'pale-gray':'#474747'
		 
		},
		boxshadow:{
		  'custom': '0 0 40px rgba(0, 0, 0, 0.2)',
		  'how-to-card-shadow':'0 4px 28px 0 rgba(0, 0, 0, 0.09) '
  
	  },
  
	  backgroundImage: {
		'radial-primary': "radial-gradient(circle, #006C4A 20%, #FFFFFF 100%)",
	  }
	}
  }
  };
  